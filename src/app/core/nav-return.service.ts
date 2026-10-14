import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

interface ReturnSnap {
  url: string;
  scrollY: number;
}

/**
 * Mémorise l’URL + scroll avant d’ouvrir une page détail,
 * pour que « Retour » ramène au même endroit.
 */
@Injectable({ providedIn: 'root' })
export class NavReturnService {
  private readonly router = inject(Router);
  private snap: ReturnSnap | null = null;

  rememberCurrent(): void {
    this.snap = {
      url: this.router.url.split('?')[0] || '/',
      scrollY: typeof window !== 'undefined' ? window.scrollY : 0
    };
  }

  /** Retour au snapshot, sinon fallback (souvent accueil + ancre). */
  goBack(fallback: string = '/'): void {
    const s = this.snap;
    this.snap = null;
    if (!s) {
      void this.router.navigateByUrl(fallback);
      return;
    }
    void this.router.navigateByUrl(s.url).then(() => {
      requestAnimationFrame(() => window.scrollTo(0, s.scrollY));
    });
  }
}
