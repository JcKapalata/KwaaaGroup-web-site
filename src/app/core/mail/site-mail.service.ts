import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';

export type SiteMailKind = 'devis' | 'partenariat';

export type SiteMailOk = {
  ok: true;
  message: string;
  expiresInSeconds?: number;
  kind?: SiteMailKind;
  email?: string;
};

@Injectable({ providedIn: 'root' })
export class SiteMailService {
  private readonly http = inject(HttpClient);

  private get baseUrl(): string {
    const base = (environment.mailApiBaseUrl || '').trim().replace(/\/$/, '');
    if (!base) {
      throw new Error('mailApiBaseUrl manquant (environment non configuré)');
    }
    return base;
  }

  private post(path: string, body: Record<string, unknown>): Observable<SiteMailOk> {
    return this.http.post<SiteMailOk>(`${this.baseUrl}${path}`, body).pipe(timeout(45000));
  }

  submitDevis(body: Record<string, unknown>): Observable<SiteMailOk> {
    return this.post('/devis', body);
  }

  submitPartenariat(body: Record<string, unknown>): Observable<SiteMailOk> {
    return this.post('/partenariat', body);
  }

  confirm(token: string): Observable<SiteMailOk> {
    return this.post('/confirm', { token });
  }
}
