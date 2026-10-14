import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { RememberReturnDirective } from '../../../shared/directives/remember-return.directive';

@Component({
  selector: 'app-circularity-section',
  standalone: true,
  imports: [
    RouterLink,
    ScrollRevealDirective,
    TextRevealDirective,
    TranslatePipe,
    RememberReturnDirective
  ],
  templateUrl: './circularity-section.component.html',
  styleUrl: './circularity-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircularitySectionComponent {
  readonly flows = [
    { labelKey: 'Construction → Agro', textKey: 'f1' },
    { labelKey: 'Agro → Event', textKey: 'f2' },
    { labelKey: 'Logistique → Tous', textKey: 'f3' },
    { labelKey: 'Consulting → Tous', textKey: 'f4' }
  ] as const;
}
