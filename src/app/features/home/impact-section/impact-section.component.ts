import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { RememberReturnDirective } from '../../../shared/directives/remember-return.directive';

@Component({
  selector: 'app-impact-section',
  standalone: true,
  imports: [
    RouterLink,
    ScrollRevealDirective,
    TextRevealDirective,
    TranslatePipe,
    RememberReturnDirective
  ],
  templateUrl: './impact-section.component.html',
  styleUrl: './impact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpactSectionComponent {
  readonly items = [
    { tag: 'Construction', tKey: 'i1.t', pKey: 'i1.p', route: '/infrastructures' },
    { tag: 'Agro', tKey: 'i2.t', pKey: 'i2.p', route: '/alimentation' },
    { tagKey: 'i3.g', tKey: 'i3.t', pKey: 'i3.p', route: '/emploi' },
    { tag: 'Event & Logistique', tKey: 'i4.t', pKey: 'i4.p', route: '/mobilite' },
    { tag: 'Consulting', tKey: 'i5.t', pKey: 'i5.p', route: '/gestion' },
    { tagKey: 'i6.g', tKey: 'i6.t', pKey: 'i6.p', route: '/integrite' }
  ] as const;
}
