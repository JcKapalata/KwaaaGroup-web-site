import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { mailto } from '../../../core/public-contact';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { RememberReturnDirective } from '../../../shared/directives/remember-return.directive';

@Component({
  selector: 'app-careers-section',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    ScrollRevealDirective,
    TextRevealDirective,
    TranslatePipe,
    RememberReturnDirective
  ],
  templateUrl: './careers-section.component.html',
  styleUrl: './careers-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersSectionComponent {
  readonly applyHref = mailto('Candidature KWAAA Group');
  readonly email = 'info@kwaaagroup.com';

  readonly perks = [
    {
      icon: 'school',
      tKey: 'p1.t',
      pKey: 'p1.p'
    },
    {
      icon: 'place',
      tKey: 'p2.t',
      pKey: 'p2.p'
    },
    {
      icon: 'trending_up',
      tKey: 'p3.t',
      pKey: 'p3.p'
    },
    {
      icon: 'translate',
      tKey: 'p4.t',
      pKey: 'p4.p'
    }
  ] as const;
}
