import { Injectable, computed, effect, signal } from '@angular/core';
import { DICTS, Lang } from './translations';

const STORAGE_KEY = 'kwaaa-lang';

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<Lang>(this.readInitial());

  readonly dict = computed(() => DICTS[this.lang()]);

  constructor() {
    effect(() => {
      const l = this.lang();
      document.documentElement.lang = l;
      try {
        localStorage.setItem(STORAGE_KEY, l);
      } catch {
        /* ignore */
      }
    });
  }

  t(key: string): string {
    const d = this.dict();
    return d[key] ?? DICTS.fr[key] ?? key;
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  private readInitial(): Lang {
    try {
      const hash = location.hash;
      if (hash === '#en') return 'en';
      if (hash === '#fr') return 'fr';
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'fr') return stored;
    } catch {
      /* ignore */
    }
    return 'fr';
  }
}
