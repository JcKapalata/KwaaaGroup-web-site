import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-stats-band',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './stats-band.component.html',
  styleUrl: './stats-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsBandComponent {
  readonly stats = [
    { value: '04', label: 'branches d’activité' },
    { value: '03', label: 'associés fondateurs' },
    { value: '2025', label: 'fondation · mai' },
    { value: '∞', label: 'ambition : l’Afrique' }
  ] as const;
}
