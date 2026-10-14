import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

interface HeroSlide {
  eyebrowKey: string;
  titleKey: string;
  scriptKey?: string;
  leadKey: string;
  primary: { labelKey: string; href: string };
  secondary?: { labelKey: string; href: string };
  goldMark?: boolean;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly index = signal(0);
  readonly paused = signal(false);

  readonly slides: HeroSlide[] = [
    {
      eyebrowKey: 'hero.eyebrow',
      titleKey: 'hero.t1',
      scriptKey: 'hero.t2',
      leadKey: 'hero.lead',
      primary: { labelKey: 'hero.cta1', href: '#devis' },
      secondary: { labelKey: 'hero.cta2', href: '#branches' }
    },
    {
      eyebrowKey: 's2.eb',
      titleKey: 's2.t',
      leadKey: 's2.lead',
      primary: { labelKey: 's2.c1', href: '#devis' },
      secondary: { labelKey: 's2.c2', href: '#branches' },
      goldMark: true
    },
    {
      eyebrowKey: 's3.eb',
      titleKey: 's3.t',
      leadKey: 's3.lead',
      primary: { labelKey: 's3.c1', href: '#impact' }
    },
    {
      eyebrowKey: 's4.eb',
      titleKey: 's4.t',
      leadKey: 's4.lead',
      primary: { labelKey: 's4.c1', href: '#carrieres' },
      goldMark: true
    }
  ];

  ngOnInit(): void {
    const reduce =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    interval(7000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this.paused()) this.next();
      });
  }

  go(i: number): void {
    const n = this.slides.length;
    this.index.set(((i % n) + n) % n);
  }

  next(): void {
    this.go(this.index() + 1);
  }

  prev(): void {
    this.go(this.index() - 1);
  }
}
