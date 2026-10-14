import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input
} from '@angular/core';

/**
 * Animation 3D au scroll (haut ↔ bas) via IntersectionObserver.
 * Logique isolée — pas de mélange dans les composants métier.
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
  host: {
    class: 'reveal'
  }
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private lastY = 0;

  /** Délai optionnel (ms) pour cascade asymétrique */
  readonly revealDelay = input(0, { alias: 'appScrollRevealDelay' });

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const delay = this.revealDelay();
    if (delay > 0) {
      node.style.transitionDelay = `${delay}ms`;
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-in');
      return;
    }

    this.lastY = window.scrollY;
    this.observer = new IntersectionObserver(
      (entries) => {
        const scrollingDown = window.scrollY >= this.lastY;
        this.lastY = window.scrollY;

        for (const entry of entries) {
          node.classList.remove('is-in', 'is-out-up');
          if (entry.isIntersecting) {
            node.classList.add('is-in');
          } else if (!scrollingDown && entry.boundingClientRect.top > 0) {
            node.classList.add('is-out-up');
          }
        }
      },
      { threshold: [0.12, 0.28], rootMargin: '0px 0px -8% 0px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
