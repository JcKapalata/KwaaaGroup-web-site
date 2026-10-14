import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandMarkComponent } from '../../shared/components/brand-mark/brand-mark.component';
import { SocialLinksComponent } from '../../shared/components/social-links/social-links.component';
import { PUBLIC_CONTACT, mailto, telHref } from '../../core/public-contact';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RememberReturnDirective } from '../../shared/directives/remember-return.directive';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [
    BrandMarkComponent,
    SocialLinksComponent,
    TranslatePipe,
    RouterLink,
    RememberReturnDirective
  ],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteFooterComponent {
  readonly contact = PUBLIC_CONTACT;
  /** Contact générique — pas de sujet candidature */
  readonly mailContactHref = mailto();
  /** Lien « Envoyer une candidature » uniquement */
  readonly mailApplyHref = mailto('Candidature KWAAA Group');
  readonly phoneHref = telHref();
  readonly year = new Date().getFullYear();
}
