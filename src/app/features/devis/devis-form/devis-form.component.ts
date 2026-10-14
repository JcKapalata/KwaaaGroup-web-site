import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PUBLIC_CONTACT, mailto, telHref } from '../../../core/public-contact';
import { LangService } from '../../../core/i18n/lang.service';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-devis-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ScrollRevealDirective,
    TextRevealDirective,
    TranslatePipe
  ],
  templateUrl: './devis-form.component.html',
  styleUrl: './devis-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevisFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly i18n = inject(LangService);

  readonly contact = PUBLIC_CONTACT;
  readonly phoneHref = telHref();
  readonly mailHref = mailto();
  readonly ready = signal(false);
  readonly recap = signal('');
  readonly mailtoReady = signal('');

  readonly branchesFr = [
    'Construction',
    'Agro',
    'Event & Logistique',
    'Communication & Consulting'
  ] as const;

  readonly form = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    organisation: [''],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    branche: ['', Validators.required],
    lieu: [''],
    description: ['', Validators.required],
    budget: ['']
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const title = this.i18n.lang() === 'en' ? 'QUOTE REQUEST' : 'DEMANDE DE DEVIS';
    const txt = [
      title,
      '',
      `${this.i18n.t('dv.nom')} : ${v.nom}`,
      `${this.i18n.t('dv.org')} : ${v.organisation || '—'}`,
      `${this.i18n.t('dv.email')} : ${v.email}`,
      `${this.i18n.t('dv.tel')} : ${v.telephone}`,
      `${this.i18n.t('dv.branche')} : ${v.branche}`,
      `${this.i18n.t('dv.lieu')} : ${v.lieu || '—'}`,
      `${this.i18n.t('dv.budget')} : ${v.budget || '—'}`,
      '',
      `${this.i18n.t('dv.desc')} :`,
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
    } catch {
      /* ignore */
    }
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.touched && c.invalid;
  }
}
