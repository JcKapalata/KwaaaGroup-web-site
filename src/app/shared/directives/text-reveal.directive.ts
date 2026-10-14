import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input
} from '@angular/core';

/** Révélation typographique au scroll (écriture / titres). */
@Directive({
  selector: '[appTextReveal]',
  standalone: true,
  host: {
    class: 'reveal-text'
  }
})
export class TextRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  readonly textDelay = input(0, { alias: 'appTextRevealDelay' });

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const delay = this.textDelay();
    if (delay > 0) {
      node.style.transitionDelay = `${delay}ms`;
    }

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-in');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          node.classList.toggle('is-in', entry.isIntersecting);
        }
      },
      { threshold: 0.2 }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
