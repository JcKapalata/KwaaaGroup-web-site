import { Directive, ElementRef, HostListener, OnDestroy, inject, input } from '@angular/core';

/**
 * Légère inclinaison 3D au survol / suivi curseur (désactivé si reduced-motion).
 */
@Directive({
  selector: '[appCursorTilt]',
  standalone: true
})
export class CursorTiltDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly intensity = input(8, { alias: 'appCursorTilt' });

  private reduced =
    typeof matchMedia !== 'undefined' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('pointermove', ['$event'])
  onMove(e: PointerEvent): void {
    if (this.reduced) return;
    const node = this.el.nativeElement;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const i = this.intensity();
    node.style.transform = `perspective(900px) rotateY(${x * i}deg) rotateX(${-y * i}deg) translateZ(0)`;
  }

  @HostListener('pointerleave')
  onLeave(): void {
    this.el.nativeElement.style.transform = '';
  }

  ngOnDestroy(): void {
    this.el.nativeElement.style.transform = '';
  }
}
