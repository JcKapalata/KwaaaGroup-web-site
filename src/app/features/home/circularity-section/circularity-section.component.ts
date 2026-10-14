import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';

@Component({
  selector: 'app-circularity-section',
  standalone: true,
  imports: [ScrollRevealDirective, TextRevealDirective],
  templateUrl: './circularity-section.component.html',
  styleUrl: './circularity-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircularitySectionComponent {
  readonly flows = [
    { label: 'Construction → Agro', text: "Entrepôts, bâtiments d'élevage et unités de transformation." },
    { label: 'Agro → Event', text: 'Restauration des événements avec des produits locaux.' },
    { label: 'Logistique → Tous', text: 'Transport des matériaux, des récoltes et des équipes.' },
    { label: 'Consulting → Tous', text: 'Marketing, finance et recrutement pour chaque branche.' }
  ] as const;
}
