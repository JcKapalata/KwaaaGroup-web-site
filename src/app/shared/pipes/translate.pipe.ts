import { Pipe, PipeTransform, inject } from '@angular/core';
import { LangService } from '../../core/i18n/lang.service';

/** Pipe pur réactif via lang() — marquer impure pour suivi du signal. */
@Pipe({ name: 't', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly lang = inject(LangService);

  transform(key: string): string {
    // lecture du signal pour invalidation
    this.lang.lang();
    return this.lang.t(key);
  }
}
