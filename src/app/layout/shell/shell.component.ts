import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from '../site-header/site-header.component';
import { SiteFooterComponent } from '../site-footer/site-footer.component';
import { LangService } from '../../core/i18n/lang.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  private readonly lang = inject(LangService);
  private readonly appRef = inject(ApplicationRef);

  constructor() {
    effect(() => {
      this.lang.lang();
      // Force refresh des sections OnPush quand FR/EN change
      queueMicrotask(() => this.appRef.tick());
    });
  }
}
