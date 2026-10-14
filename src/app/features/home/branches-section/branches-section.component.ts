import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-branches-section',
  standalone: true,
  imports: [MatIconModule, ScrollRevealDirective, TextRevealDirective, TranslatePipe],
  templateUrl: './branches-section.component.html',
  styleUrl: './branches-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchesSectionComponent {
  readonly branches: ReadonlyArray<{
    tag: string;
    title: string;
    icon: string;
    lead?: boolean;
    pKey: string;
    tagKeys: readonly string[];
  }> = [
    {
      tag: '01 · Construction',
      title: 'Construction',
      icon: 'apartment',
      lead: true,
      pKey: 'b1.p',
      tagKeys: ['b1.l1', 'b1.l2', 'b1.l3', 'b1.l4']
    },
    {
      tag: '02 · Agro',
      title: 'Agro',
      icon: 'agriculture',
      pKey: 'b2.p',
      tagKeys: ['b2.l1', 'b2.l2', 'b2.l3', 'b2.l4']
    },
    {
      tag: '03 · Event & Logistique',
      title: 'Event & Logistique',
      icon: 'local_shipping',
      pKey: 'b3.p',
      tagKeys: ['b3.l1', 'b3.l2', 'b3.l3', 'b3.l4']
    },
    {
      tag: '04 · Communication & Consulting',
      title: 'Communication & Consulting',
      icon: 'campaign',
      pKey: 'b4.p',
      tagKeys: ['b4.l1', 'b4.l2', 'b4.l3', 'b4.l4']
    }
  ];
}
