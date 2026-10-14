import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PUBLIC_CONTACT, mailto, telHref } from '../../../core/public-contact';
import { LangService } from '../../../core/i18n/lang.service';
import { NavReturnService } from '../../../core/nav-return.service';
import { minMaxLen, optionalEmail, phoneE164 } from '../../../core/form-validators';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { CursorTiltDirective } from '../../../shared/directives/cursor-tilt.directive';
import { PhoneInputComponent } from '../../../shared/components/phone-input/phone-input.component';

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

  readonly contact = PUBLIC_CONTACT;
  readonly phoneHref = telHref();
  readonly mailHref = mailto();
  readonly ready = signal(false);
  readonly recap = signal('');
  readonly mailtoReady = signal('');
  readonly copied = signal(false);

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
      org: en ? 'Company or organisation (optional)' : 'Entreprise ou organisation (facultatif)',
      tel: en ? 'Phone' : 'Téléphone',
      email: en ? 'Email (optional)' : 'E-mail (facultatif)',
      branche: en ? 'Branch concerned' : 'Branche concernée',
      lieu: en ? 'Project location (city, country)' : 'Lieu du projet (ville, pays)',
      desc: en ? 'Describe your need' : 'Description du besoin',
      delai: en ? 'Preferred date (optional)' : 'Date souhaitée (facultatif)',
      budget: en ? 'Indicative budget in USD (optional)' : 'Budget indicatif en USD (facultatif)'
    };
  });

  readonly form = this.fb.nonNullable.group({
    nom: ['', [Validators.required, minMaxLen(2, 80)]],
    organisation: ['', minMaxLen(2, 120)],
    telephone: ['', phoneE164()],
    email: ['', [optionalEmail(), Validators.maxLength(120)]],
    branche: ['', Validators.required],
    lieu: ['', [Validators.required, minMaxLen(2, 120)]],
    description: ['', [Validators.required, minMaxLen(20, 2000)]],
    delai: [''],
    budget: ['', minMaxLen(1, 40)]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const u = this.ui();
    const title = this.i18n.lang() === 'en' ? 'QUOTE REQUEST' : 'DEMANDE DE DEVIS';
    const txt = [
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

    const subject =
      (this.i18n.lang() === 'en' ? 'Quote request' : 'Demande de devis') + ` – ${v.nom}`;
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
