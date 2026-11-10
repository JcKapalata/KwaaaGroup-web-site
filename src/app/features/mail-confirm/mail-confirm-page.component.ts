import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LangService } from '../../core/i18n/lang.service';
import { SiteMailService, type SiteMailKind } from '../../core/mail/site-mail.service';

type ConfirmState = 'loading' | 'ok' | 'expired' | 'used' | 'error';

@Component({
  selector: 'app-mail-confirm-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mail-confirm-page.component.html',
  styleUrl: './mail-confirm-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailConfirmPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mail = inject(SiteMailService);
  readonly i18n = inject(LangService);

  readonly state = signal<ConfirmState>('loading');
  readonly email = signal('');
  readonly kind = signal<SiteMailKind | null>(null);

  readonly ui = computed(() => {
    const en = this.i18n.lang() === 'en';
    const kind = this.kind();
    const kindLabel =
      kind === 'partenariat'
        ? en
          ? 'partnership request'
          : 'demande de partenariat'
        : en
          ? 'quote request'
          : 'demande de devis';
    return {
      loading: en ? 'Confirming your email…' : 'Confirmation de votre e-mail…',
      okT: en ? 'Email confirmed' : 'E-mail confirmé',
      okP: en
        ? `Thank you. Your ${kindLabel} has been sent to our team. We will contact you shortly.`
        : `Merci. Votre ${kindLabel} a été transmise à notre équipe. Nous vous recontactons rapidement.`,
      expiredT: en ? 'Link expired' : 'Lien expiré',
      expiredP: en
        ? 'This confirmation link is no longer valid. Please submit the form again.'
        : 'Ce lien de confirmation n’est plus valide. Veuillez renvoyer le formulaire.',
      usedT: en ? 'Already confirmed' : 'Déjà confirmé',
      usedP: en
        ? 'This link was already used. Our team has received your request.'
        : 'Ce lien a déjà été utilisé. Notre équipe a bien reçu votre demande.',
      errT: en ? 'Confirmation failed' : 'Confirmation impossible',
      errP: en
        ? 'We could not confirm this link. Try again or contact us.'
        : 'Nous n’avons pas pu confirmer ce lien. Réessayez ou contactez-nous.',
      home: en ? 'Back to home' : 'Retour à l’accueil',
      again: en ? 'Submit again' : 'Renvoyer une demande'
    };
  });

  readonly againLink = computed(() =>
    this.kind() === 'partenariat' ? '/partenariat' : '/devis'
  );

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token')?.trim() || '';
    const pathKind = this.route.snapshot.data['kind'] as SiteMailKind | undefined;
    if (pathKind) this.kind.set(pathKind);

    if (!token) {
      this.state.set('error');
      return;
    }

    this.mail.confirm(token).subscribe({
      next: (res) => {
        this.state.set('ok');
        this.email.set(res.email || '');
        if (res.kind === 'devis' || res.kind === 'partenariat') {
          this.kind.set(res.kind);
        }
      },
      error: (err: { status?: number }) => {
        const status = err?.status;
        if (status === 410) this.state.set('expired');
        else if (status === 409) this.state.set('used');
        else this.state.set('error');
      }
    });
  }
}
