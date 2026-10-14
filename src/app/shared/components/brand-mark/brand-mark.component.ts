import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-mark',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brand-mark.component.html',
  styleUrl: './brand-mark.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandMarkComponent {
  readonly tone = input<'light' | 'gold' | 'dark'>('light');
  readonly showWordmark = input(true);
  readonly link = input('/');
}
