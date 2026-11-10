import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge, startWith } from 'rxjs';
import { PUBLIC_CONTACT, mailto, telHref } from '../../../core/public-contact';
import { LangService } from '../../../core/i18n/lang.service';
import { NavReturnService } from '../../../core/nav-return.service';
import {
  lengthErrMsg,
  minMaxLen,
  optionalEmail,
  phoneE164,
  requiredEmail
} from '../../../core/form-validators';
import { SiteMailService } from '../../../core/mail/site-mail.service';
import { genericMailError } from '../../../core/mail/generic-mail-error';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { CursorTiltDirective } from '../../../shared/directives/cursor-tilt.directive';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';

type ViewMode = 'form' | 'check_inbox';

@Component({
  selector: 'app-devis-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ScrollRevealDirective,
    TextRevealDirective,
    CursorTiltDirective,
    PhoneInputComponent
  ],
  templateUrl: './devis-page.component.html',
  styleUrl: './devis-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevisPageComponent {
  private readonly fb = inject(FormBuilder);
  readonly i18n = inject(LangService);
  private readonly navReturn = inject(NavReturnService);
  private readonly mail = inject(SiteMailService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly contact = PUBLIC_CONTACT;
  readonly phoneHref = telHref();
  readonly mailHref = mailto();

  readonly mode = signal<ViewMode>('form');
  readonly sending = signal(false);
  readonly confirmOpen = signal(false);
  readonly copied = signal(false);
  readonly submittedEmail = signal('');
  readonly formError = signal('');

  readonly form = this.fb.nonNullable.group({
    nom: ['', [Validators.required, minMaxLen(2, 80)]],
    organisation: ['', minMaxLen(2, 120)],
    telephone: ['', phoneE164()],
    email: ['', [optionalEmail(), Validators.maxLength(120)]],
    branche: ['', Validators.required],
    lieu: ['', [Validators.required, minMaxLen(2, 120)]],
    description: ['', [Validators.required, minMaxLen(20, 2000)]],
    delai: [''],
    budget: ['', minMaxLen(1, 40)],
    website: ['']
  });

  /** Tick réactif — met à jour boutons désactivés (OnPush). */
  private readonly formTick = toSignal(
    merge(this.form.statusChanges, this.form.valueChanges).pipe(startWith(null)),
    { initialValue: null }
  );

  readonly branches = computed(() =>
    this.i18n.lang() === 'en'
      ? [
          'Construction',
          'Agro',
          'Events & Logistics',
          'Communication & Consulting',
          'Not sure yet'
        ]
      : [
          'Construction',
          'Agro',
          'Event & Logistique',
          'Communication & Consulting',
          'Je ne sais pas encore'
        ]
  );

  readonly ui = computed(() => {
    const en = this.i18n.lang() === 'en';
    return {
      back: en ? '← Back to home' : '← Retour à l’accueil',
      tag: en ? 'Quote request' : 'Demande de devis',
      title: en ? 'Request a quote' : 'Demander un devis',
      lead: en
        ? 'Describe what you need. We will contact you to clarify the project and send you an offer.'
        : 'Décrivez votre besoin. Nous vous recontactons pour préciser le projet et vous envoyer une offre.',
      call: en ? 'Prefer to talk?' : 'Vous préférez appeler ?',
      send: en ? 'Send email' : 'Envoi e-mail',
      sending: en ? 'Sending…' : 'Envoi…',
      copy: en ? 'Copy request' : 'Copier la demande',
      copied: en ? 'Copied' : 'Copié',
      privacy: en
        ? 'Your details are used only to handle your request.'
        : 'Vos informations servent uniquement à traiter votre demande.',
      attention: en
        ? 'Important: email send opens a confirmation modal, then a verification link (1 hour) is sent to your address. Our team only receives the request after you confirm.'
        : 'Important : l’envoi e-mail ouvre une confirmation, puis un lien de vérification (1 h) est envoyé à votre adresse. Notre équipe ne reçoit la demande qu’après votre confirmation.',
      req: en ? 'Required field' : 'Champ obligatoire',
      emailBad: en ? 'Enter a valid email address' : 'Saisissez une adresse e-mail valide',
      emailNeed: en
        ? 'An email is required to send a verification link.'
        : 'Un e-mail est requis pour envoyer le lien de vérification.',
      phoneBad: en ? 'Enter a valid phone number' : 'Saisissez un numéro de téléphone valide',
      confirmT: en ? 'Confirm email send?' : 'Confirmer l’envoi e-mail ?',
      confirmP: en
        ? 'We will send a verification link to your address. Confirm only if the details are correct.'
        : 'Nous enverrons un lien de vérification à votre adresse. Confirmez seulement si les informations sont correctes.',
      confirmYes: en ? 'Yes, send' : 'Oui, envoyer',
      confirmNo: en ? 'Cancel' : 'Annuler',
      inboxT: en ? 'Check your inbox' : 'Vérifiez votre boîte e-mail',
      inboxP: en
        ? 'We sent a confirmation link (valid 1 hour). After you confirm, our team receives your request at info@kwaaagroup.com.'
        : 'Nous avons envoyé un lien de confirmation (valide 1 heure). Après confirmation, notre équipe reçoit votre demande sur info@kwaaagroup.com.',
      nom: en ? 'Full name' : 'Nom complet',
      org: en ? 'Company or organisation (optional)' : 'Entreprise ou organisation (facultatif)',
      tel: en ? 'Phone' : 'Téléphone',
      email: en ? 'Email' : 'E-mail',
      emailHint: en
        ? 'Required for email send (verification link).'
        : 'Obligatoire pour l’envoi e-mail (lien de vérification).',
      branche: en ? 'Branch concerned' : 'Branche concernée',
      lieu: en ? 'Project location (city, country)' : 'Lieu du projet (ville, pays)',
      desc: en ? 'Describe your need' : 'Description du besoin',
      delai: en ? 'Preferred date (optional)' : 'Date souhaitée (facultatif)',
      budget: en ? 'Indicative budget in USD (optional)' : 'Budget indicatif en USD (facultatif)'
    };
  });

  readonly canSendEmail = computed(() => {
    this.formTick();
    if (this.sending()) return false;
    if (this.form.invalid) return false;
    return !!String(this.form.controls.email.value ?? '').trim();
  });

  readonly canCopy = computed(() => {
    this.formTick();
    return !this.sending() && this.form.valid;
  });

  openConfirm(): void {
    this.formError.set('');
    if (!String(this.form.controls.email.value ?? '').trim()) {
      this.form.controls.email.setValidators([requiredEmail(), Validators.maxLength(120)]);
      this.form.controls.email.updateValueAndValidity({ emitEvent: true });
      this.form.markAllAsTouched();
      this.formError.set(this.ui().emailNeed);
      this.cdr.markForCheck();
      return;
    }
    this.form.controls.email.setValidators([requiredEmail(), Validators.maxLength(120)]);
    this.form.controls.email.updateValueAndValidity({ emitEvent: true });
    if (this.form.invalid || this.sending()) {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    this.confirmOpen.set(true);
  }

  closeConfirm(): void {
    if (this.sending()) return;
    this.confirmOpen.set(false);
    this.form.controls.email.setValidators([optionalEmail(), Validators.maxLength(120)]);
    this.form.controls.email.updateValueAndValidity({ emitEvent: true });
  }

  confirmSend(): void {
    if (this.form.invalid || this.sending()) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.formError.set('');
    const v = this.form.getRawValue();

    this.mail.submitDevis({ ...v, lang: this.i18n.lang() }).subscribe({
      next: () => {
        this.sending.set(false);
        this.confirmOpen.set(false);
        this.submittedEmail.set(v.email.trim());
        this.mode.set('check_inbox');
        this.cdr.markForCheck();
      },
      error: () => {
        this.sending.set(false);
        this.formError.set(genericMailError(this.i18n.lang()));
        this.cdr.markForCheck();
      }
    });
  }

  buildRecap(): string {
    const v = this.form.getRawValue();
    const u = this.ui();
    const title = this.i18n.lang() === 'en' ? 'QUOTE REQUEST' : 'DEMANDE DE DEVIS';
    return [
      title,
      '',
      `${u.nom} : ${v.nom}`,
      `${u.org} : ${v.organisation || '—'}`,
      `${u.tel} : ${v.telephone}`,
      `${u.email} : ${v.email || '—'}`,
      `${u.branche} : ${v.branche}`,
      `${u.lieu} : ${v.lieu}`,
      `${u.delai} : ${v.delai || '—'}`,
      `${u.budget} : ${v.budget || '—'}`,
      '',
      `${u.desc} :`,
      v.description
    ].join('\n');
  }

  async copyRequest(): Promise<void> {
    this.formError.set('');
    this.form.controls.email.setValidators([optionalEmail(), Validators.maxLength(120)]);
    this.form.controls.email.updateValueAndValidity({ emitEvent: true });

    if (!this.canCopy()) {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }
    try {
      await navigator.clipboard.writeText(this.buildRecap());
      this.copied.set(true);
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied.set(false);
        this.cdr.markForCheck();
      }, 1600);
    } catch {
      this.formError.set(genericMailError(this.i18n.lang()));
      this.cdr.markForCheck();
    }
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.touched && c.invalid;
  }

  errMsg(name: keyof typeof this.form.controls): string {
    const c = this.form.controls[name] as AbstractControl;
    const u = this.ui();
    if (!c.touched || !c.errors) return '';
    if (c.errors['required']) return name === 'email' ? u.emailNeed : u.req;
    if (c.errors['email']) return u.emailBad;
    if (c.errors['phone']) return u.phoneBad;
    const len = lengthErrMsg(c.errors, this.i18n.lang());
    if (len) return len;
    return u.req;
  }

  goBack(): void {
    this.navReturn.goBack('/');
  }
}
