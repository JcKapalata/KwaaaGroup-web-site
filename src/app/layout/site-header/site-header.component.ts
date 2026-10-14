import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BrandMarkComponent } from '../../shared/components/brand-mark/brand-mark.component';
import { LangService } from '../../core/i18n/lang.service';
import { Lang } from '../../core/i18n/translations';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [BrandMarkComponent, TranslatePipe],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent {
  readonly lang = inject(LangService);
  readonly menuOpen = signal(false);

  readonly links = [
    { href: '#name', key: 'nav.vision' },
    { href: '#branches', key: 'nav.branches' },
    { href: '#impact', key: 'nav.impact' },
    { href: '#partenaires', key: 'nav.partners' },
    { href: '#carrieres', key: 'nav.jobs' },
    { href: '#contact', key: 'nav.contact' }
  ] as const;

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
