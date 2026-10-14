import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';

@Component({
  selector: 'app-values-section',
  standalone: true,
  imports: [ScrollRevealDirective, TextRevealDirective],
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
