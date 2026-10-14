import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { mailto } from '../../../core/public-contact';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';

@Component({
  selector: 'app-careers-section',
  standalone: true,
  imports: [MatIconModule, ScrollRevealDirective, TextRevealDirective],
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
      t: 'Stages rémunérés',
      p: 'Un stage chez nous est un vrai travail, et il est payé.'
    },
    {
      icon: 'place',
      t: "Priorité à l'embauche locale",
      p: 'À compétence égale, nous recrutons d’abord là où nous travaillons.'
    },
    {
      icon: 'trending_up',
      t: 'Évolution au mérite',
      p: 'Les responsabilités vont à ceux qui obtiennent des résultats.'
    },
    {
      icon: 'translate',
      t: 'Français, anglais, langues locales',
      p: 'Nos langues de travail, pour servir tous nos clients.'
    }
  ] as const;
}
