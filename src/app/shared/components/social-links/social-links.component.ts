import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SOCIAL_LINKS, SocialNetwork } from '../../../core/public-contact';

const ICON_SRC: Record<SocialNetwork, string> = {
  x: 'assets/social/x.svg',
  facebook: 'assets/social/facebook.svg',
  instagram: 'assets/social/instagram.svg',
  tiktok: 'assets/social/tiktok.svg',
  linkedin: 'assets/social/linkedin.svg'
};

@Component({
  selector: 'app-social-links',
  standalone: true,
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialLinksComponent {
  /** `on-dark` = footer ; `on-light` = section contact */
  readonly tone = input<'on-dark' | 'on-light'>('on-dark');

  readonly links = SOCIAL_LINKS.map((s) => ({
    ...s,
    icon: ICON_SRC[s.id]
  }));
}
