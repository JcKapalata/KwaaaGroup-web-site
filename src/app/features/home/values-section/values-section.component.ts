import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { RememberReturnDirective } from '../../../shared/directives/remember-return.directive';

@Component({
  selector: 'app-values-section',
  standalone: true,
  imports: [
    RouterLink,
    ScrollRevealDirective,
    TextRevealDirective,
    TranslatePipe,
    RememberReturnDirective
  ],
  templateUrl: './values-section.component.html',
  styleUrl: './values-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValuesSectionComponent {
  readonly values = [
    { t: 'Ambition', p: "Voir grand : le Congo d'abord, l'Afrique ensuite." },
    {
      t: 'Flexibilité',
      p: 'S’adapter vite au terrain, aux clients et aux opportunités, sans perdre le cap.'
    },
    { t: 'Circularité', p: "Chaque branche est l'intrant de l'autre." },
    {
      t: 'Constance',
      p: 'Tenir nos engagements de qualité et de délais, projet après projet.'
    }
  ] as const;
}
