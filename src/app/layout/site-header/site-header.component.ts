import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { BrandMarkComponent } from '../../shared/components/brand-mark/brand-mark.component';
import { LangService } from '../../core/i18n/lang.service';
import { Lang } from '../../core/i18n/translations';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RememberReturnDirective } from '../../shared/directives/remember-return.directive';

type NavLink =
  | { key: string; route: string; cta?: boolean }
  | { key: string; fragment: string };

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [BrandMarkComponent, TranslatePipe, RouterLink, RememberReturnDirective],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent {
  readonly lang = inject(LangService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly menuOpen = signal(false);

  private readonly locationUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  /**
   * Pages à accès direct (sans scroll) :
   * Vision + 4 branches + Emploi + Contact + CTA Devis.
   */
  readonly links: readonly NavLink[] = [
    { route: '/vision', key: 'nav.vision' },
    { route: '/infrastructures', key: 'nav.construction' },
    { route: '/alimentation', key: 'nav.agro' },
    { route: '/mobilite', key: 'nav.event' },
    { route: '/gestion', key: 'nav.consulting' },
    { route: '/emploi', key: 'nav.jobs' },
    { fragment: 'contact', key: 'nav.contact' },
    { route: '/devis', key: 'nav.devis', cta: true }
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.closeMenu());
  }

  linkActive(link: NavLink): boolean {
    const url = this.locationUrl();
    const path = url.split('?')[0].split('#')[0] || '/';
    const hash = url.includes('#') ? url.slice(url.indexOf('#') + 1) : '';

    if ('fragment' in link) {
      return (path === '/' || path === '') && hash === link.fragment;
    }
    return path === link.route;
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  setLang(l: Lang): void {
    this.lang.setLang(l);
  }
}
