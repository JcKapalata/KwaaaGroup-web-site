import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';

@Component({
  selector: 'app-impact-section',
  standalone: true,
  imports: [ScrollRevealDirective, TextRevealDirective],
  templateUrl: './impact-section.component.html',
  styleUrl: './impact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpactSectionComponent {
  readonly items = [
    {
      tag: 'Construction',
      t: 'Des infrastructures solides',
      p: 'Des logements, des bâtiments et des routes qui durent, avec des matériaux produits sur place.',
      href: '#branches'
    },
    {
      tag: 'Agro',
      t: 'La sécurité alimentaire',
      p: 'Produire, transformer et distribuer localement pour moins dépendre des importations.',
      href: '#branches'
    },
    {
      tag: 'Emploi',
      t: "L'emploi des jeunes",
      p: "Des stages rémunérés et des carrières ouvertes à ceux qui ont le talent et l'envie.",
      href: '#carrieres'
    },
    {
      tag: 'Event & Logistique',
      t: 'Relier les personnes et les marchés',
      p: 'Transport, tourisme et événements pour faire circuler les gens, les biens et les idées.',
      href: '#branches'
    },
    {
      tag: 'Consulting',
      t: 'Des entreprises mieux gérées',
      p: 'Marketing, finance et ressources humaines pour aider les organisations à grandir.',
      href: '#branches'
    },
    {
      tag: 'Gouvernance',
      t: "L'intégrité comme règle",
      p: 'Tolérance zéro face à la corruption et au tribalisme, à tous les niveaux du groupe.',
      href: '#valeurs'
    }
  ] as const;
}
