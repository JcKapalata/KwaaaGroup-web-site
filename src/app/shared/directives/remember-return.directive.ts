import { Directive, HostListener, inject } from '@angular/core';
import { NavReturnService } from '../../core/nav-return.service';

/** Sur clic lien → mémorise scroll/page courante avant navigation. */
@Directive({
  selector: '[appRememberReturn]',
  standalone: true
})
export class RememberReturnDirective {
  private readonly navReturn = inject(NavReturnService);

  @HostListener('click')
  onClick(): void {
    this.navReturn.rememberCurrent();
  }
}
