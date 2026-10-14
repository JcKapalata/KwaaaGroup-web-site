import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PUBLIC_CONTACT, mailto, telHref } from '../../../core/public-contact';
import { LangService } from '../../../core/i18n/lang.service';
import { NavReturnService } from '../../../core/nav-return.service';
import { minMaxLen, phoneE164, requiredEmail } from '../../../core/form-validators';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { CursorTiltDirective } from '../../../shared/directives/cursor-tilt.directive';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';

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

  readonly contact = PUBLIC_CONTACT;
  readonly phoneHref = telHref();
  readonly mailHref = mailto();
  readonly ready = signal(false);
  readonly recap = signal('');
  readonly mailtoReady = signal('');
  readonly copied = signal(false);

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
      send: en ? 'Send request' : 'Envoyer la demande',
      privacy: en
        ? 'Your details are used only to handle your request.'
        : 'Vos informations servent uniquement à traiter votre demande.',
      req: en ? 'Required field' : 'Champ obligatoire',
      emailBad: en ? 'Enter a valid email address' : 'Saisissez une adresse e-mail valide',
      phoneBad: en ? 'Enter a valid phone number' : 'Saisissez un numéro de téléphone valide',
      tooShort: en ? 'Text is too short' : 'Texte trop court',
      tooLong: en ? 'Text is too long' : 'Texte trop long',
      mailT: en ? 'Last step: send us your request' : 'Dernière étape : envoyez-nous votre demande',
      mailP: en
        ? `Your request is ready. Email it to ${PUBLIC_CONTACT.email}, or copy it and send it by message to ${PUBLIC_CONTACT.phoneDisplay}.`
        : `Votre demande est prête. Envoyez-la par e-mail à ${PUBLIC_CONTACT.email}, ou copiez-la et envoyez-la par message au ${PUBLIC_CONTACT.phoneDisplay}.`,
      mailB: en ? 'Open my email' : 'Ouvrir mon e-mail',
      copyB: en ? 'Copy request' : 'Copier la demande',
      copied: en ? 'Copied' : 'Copié',
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

  readonly form = this.fb.nonNullable.group({
    nom: ['', [Validators.required, minMaxLen(2, 80)]],
    organisation: ['', [Validators.required, minMaxLen(2, 120)]],
    type: ['', Validators.required],
    lieu: ['', [Validators.required, minMaxLen(2, 120)]],
    telephone: ['', phoneE164()],
    email: ['', [requiredEmail(), Validators.maxLength(120)]],
    branche: [''],
    proposition: ['', [Validators.required, minMaxLen(20, 2000)]]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const u = this.ui();
    const title =
      this.i18n.lang() === 'en' ? 'PARTNERSHIP REQUEST' : 'DEMANDE DE PARTENARIAT';
    const txt = [
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

    const subject =
      (this.i18n.lang() === 'en' ? 'Partnership request' : 'Demande de partenariat') +
      ` – ${v.nom}`;
    this.recap.set(txt);
    this.mailtoReady.set(
      `mailto:${PUBLIC_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(txt)}`
    );
    this.ready.set(true);
  }

  edit(): void {
    this.ready.set(false);
  }

  async copyRecap(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.recap());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      /* ignore */
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
    if (c.errors['required']) return u.req;
    if (c.errors['email']) return u.emailBad;
    if (c.errors['phone']) return u.phoneBad;
    if (c.errors['minlength']) return u.tooShort;
    if (c.errors['maxlength']) return u.tooLong;
    return u.req;
  }

  goBack(): void {
    this.navReturn.goBack('/');
  }
}
