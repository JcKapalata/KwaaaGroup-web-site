import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  readonly menuOpen = signal(false);

  /**
   * Pages à accès direct (sans scroll) :
   * Vision + 4 branches + Emploi + Contact + CTA Devis.
   * Hors nav (déjà liés dans les sections) : modèle, intégrité, partenariat.
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
