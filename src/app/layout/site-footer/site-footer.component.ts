import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrandMarkComponent } from '../../shared/components/brand-mark/brand-mark.component';
import { PUBLIC_CONTACT, mailto, telHref } from '../../core/public-contact';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [BrandMarkComponent, TranslatePipe],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteFooterComponent {
  readonly contact = PUBLIC_CONTACT;
  readonly mailHref = mailto('Candidature KWAAA Group');
  readonly phoneHref = telHref();
  readonly year = new Date().getFullYear();
}
