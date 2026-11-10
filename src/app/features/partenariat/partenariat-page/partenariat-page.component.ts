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
  selector: 'app-partenariat-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ScrollRevealDirective,
    TextRevealDirective,
    CursorTiltDirective,
    PhoneInputComponent
  ],
  templateUrl: './partenariat-page.component.html',
  styleUrl: './partenariat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartenariatPageComponent {
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
    organisation: ['', [Validators.required, minMaxLen(2, 120)]],
    type: ['', Validators.required],
    lieu: ['', [Validators.required, minMaxLen(2, 120)]],
    telephone: ['', phoneE164()],
    email: ['', [requiredEmail(), Validators.maxLength(120)]],
    branche: [''],
    proposition: ['', [Validators.required, minMaxLen(20, 2000)]],
    website: ['']
  });

  private readonly formTick = toSignal(
    merge(this.form.statusChanges, this.form.valueChanges).pipe(startWith(null)),
    { initialValue: null }
  );

  readonly types = computed(() =>
    this.i18n.lang() === 'en'
      ? ['Supplier', 'Subcontractor', 'Institution or NGO', 'Investor', 'Other']
      : ['Fournisseur', 'Sous-traitant', 'Institution ou ONG', 'Investisseur', 'Autre']
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
      tag: en ? 'Partnership' : 'Partenariat',
      title: en ? 'Become a partner' : 'Devenir partenaire',
      lead: en
        ? 'Supplier, subcontractor, institution or investor: introduce yourself and tell us what you propose.'
        : 'Fournisseur, sous-traitant, institution ou investisseur : présentez-vous et dites-nous ce que vous proposez.',
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
      edit: en ? 'Edit' : 'Modifier',
      nom: en ? 'Full name' : 'Nom complet',
      org: en ? 'Company or organisation' : 'Entreprise ou organisation',
      type: en ? 'You are' : 'Vous êtes',
      lieu: en ? 'City and country' : 'Ville et pays',
      tel: en ? 'Phone' : 'Téléphone',
      email: en ? 'Email' : 'E-mail',
      branche: en ? 'Branch concerned' : 'Branche concernée',
      prop: en ? 'Your proposal' : 'Votre proposition'
    };
  });

  readonly canSubmit = computed(() => {
    this.formTick();
    return !this.sending() && this.form.valid;
  });

  openConfirm(): void {
    this.formError.set('');
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
  }

  confirmSend(): void {
    if (this.form.invalid || this.sending()) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.formError.set('');
    const v = this.form.getRawValue();
    this.mail.submitPartenariat({ ...v, lang: this.i18n.lang() }).subscribe({
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
    const title =
      this.i18n.lang() === 'en' ? 'PARTNERSHIP REQUEST' : 'DEMANDE DE PARTENARIAT';
    return [
      title,
      '',
      `${u.nom} : ${v.nom}`,
      `${u.org} : ${v.organisation}`,
      `${u.type} : ${v.type}`,
      `${u.lieu} : ${v.lieu}`,
      `${u.tel} : ${v.telephone}`,
      `${u.email} : ${v.email}`,
      `${u.branche} : ${v.branche || '—'}`,
      '',
      `${u.prop} :`,
      v.proposition
    ].join('\n');
  }

  async copyRequest(): Promise<void> {
    this.formError.set('');
    if (!this.canSubmit()) {
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

  edit(): void {
    this.mode.set('form');
    this.formError.set('');
    this.confirmOpen.set(false);
    this.sending.set(false);
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.touched && c.invalid;
  }

  errMsg(name: keyof typeof this.form.controls): string {
    const c = this.form.controls[name] as AbstractControl;
    const u = this.ui();
    if (!c.touched || !c.errors) return '';
    if (c.errors['required']) return u.req;
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
