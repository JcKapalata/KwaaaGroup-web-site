import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PUBLIC_CONTACT, mailto, telHref } from '../../../core/public-contact';
import { LangService } from '../../../core/i18n/lang.service';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-partenariat-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ScrollRevealDirective,
    TextRevealDirective,
    TranslatePipe
  ],
  templateUrl: './partenariat-form.component.html',
  styleUrl: './partenariat-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartenariatFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly i18n = inject(LangService);

  readonly contact = PUBLIC_CONTACT;
  readonly phoneHref = telHref();
  readonly mailHref = mailto();
  readonly ready = signal(false);
  readonly recap = signal('');
  readonly mailtoReady = signal('');

  readonly typesFr = [
    'Fournisseur',
    'Sous-traitant',
    'Institution ou ONG',
    'Investisseur',
    'Autre'
  ] as const;

  readonly typesEn = [
    'Supplier',
    'Subcontractor',
    'Institution or NGO',
    'Investor',
    'Other'
  ] as const;

  readonly branchesFr = [
    'Construction',
    'Agro',
    'Event & Logistique',
    'Communication & Consulting'
  ] as const;

  readonly form = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    organisation: ['', Validators.required],
    type: ['', Validators.required],
    lieu: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    branche: [''],
    proposition: ['', Validators.required]
  });

  types(): readonly string[] {
    return this.i18n.lang() === 'en' ? this.typesEn : this.typesFr;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const title =
      this.i18n.lang() === 'en' ? 'PARTNERSHIP REQUEST' : 'DEMANDE DE PARTENARIAT';
    const txt = [
      title,
      '',
      `${this.i18n.t('pt.nom')} : ${v.nom}`,
      `${this.i18n.t('pt.org')} : ${v.organisation}`,
      `${this.i18n.t('pt.type')} : ${v.type}`,
      `${this.i18n.t('pt.lieu')} : ${v.lieu}`,
      `${this.i18n.t('pt.tel')} : ${v.telephone}`,
      `${this.i18n.t('pt.email')} : ${v.email}`,
      `${this.i18n.t('pt.branche')} : ${v.branche || '—'}`,
      '',
      `${this.i18n.t('pt.prop')} :`,
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
    } catch {
      /* ignore */
    }
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.touched && c.invalid;
  }
}
