import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LangService } from '../../../core/i18n/lang.service';

@Component({
  selector: 'app-name-section',
  standalone: true,
  imports: [ScrollRevealDirective, TextRevealDirective, TranslatePipe],
  templateUrl: './name-section.component.html',
  styleUrl: './name-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameSectionComponent {
  private readonly i18n = inject(LangService);
  private readonly sanitizer = inject(DomSanitizer);

  sayHtml(): SafeHtml {
    this.i18n.lang();
    return this.sanitizer.bypassSecurityTrustHtml(this.i18n.t('name.say'));
  }
}
