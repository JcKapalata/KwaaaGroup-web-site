import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PUBLIC_CONTACT, mailto, telHref } from '../../../core/public-contact';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [MatIconModule, ScrollRevealDirective, TextRevealDirective, TranslatePipe],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSectionComponent {
  readonly contact = PUBLIC_CONTACT;
  readonly mailHref = mailto();
  readonly phoneHref = telHref();
  readonly copied = signal<string | null>(null);

  async copy(key: string, value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.copied.set(key);
      setTimeout(() => this.copied.set(null), 1600);
    } catch {
      /* ignore */
    }
  }
}
