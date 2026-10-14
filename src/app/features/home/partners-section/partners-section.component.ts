import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [ScrollRevealDirective, TextRevealDirective],
  templateUrl: './partners-section.component.html',
  styleUrl: './partners-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartnersSectionComponent {
  readonly cards = [
    {
      t: 'Clients',
      p: 'Particuliers, entreprises, ONG et institutions : confiez-nous un chantier, un événement ou une mission de conseil.',
      a: 'Demander un devis →',
      href: '#devis'
    },
    {
      t: 'Fournisseurs et sous-traitants',
      p: 'Producteurs, transporteurs, artisans : travaillons ensemble sur des bases claires et durables.',
      a: 'Proposer un partenariat →',
      href: '#partenariat'
    },
    {
      t: 'Institutions et investisseurs',
      p: "Vous soutenez l'entrepreneuriat africain ? Parlons de la croissance de nos branches.",
      a: 'Prendre contact →',
      href: '#partenariat'
    }
  ] as const;
}
