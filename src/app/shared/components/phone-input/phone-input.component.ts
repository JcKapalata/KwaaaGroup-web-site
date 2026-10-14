import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  forwardRef,
  inject,
  input,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString
} from 'libphonenumber-js';
import { LangService } from '../../../core/i18n/lang.service';

interface CountryOpt {
  code: CountryCode;
  dial: string;
  label: string;
}

const PREFERRED: CountryCode[] = [
  'CD',
  'CG',
  'RW',
  'BI',
  'UG',
  'KE',
  'TZ',
  'ZA',
  'FR',
  'BE',
  'CA',
  'US',
  'GB'
];

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ]
})
export class PhoneInputComponent implements ControlValueAccessor, OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  readonly i18n = inject(LangService);

  readonly invalid = input(false);
  readonly inputId = input('phone-national');

  private onChange: (v: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  readonly countries = computed(() => this.buildCountries(this.i18n.lang()));

  readonly group = this.fb.nonNullable.group({
    country: 'CD' as CountryCode,
    national: ''
  });

  readonly dialPreview = signal('+243');

  ngOnInit(): void {
    this.group.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      const country = (v.country || 'CD') as CountryCode;
      const dial = getCountryCallingCode(country);
      this.dialPreview.set(`+${dial}`);
      const national = String(v.national ?? '').trim();
      if (!national) {
        this.onChange('');
        return;
      }
      const parsed = parsePhoneNumberFromString(national, country);
      this.onChange(parsed?.number ?? `+${dial}${national.replace(/\D/g, '')}`);
    });
  }

  writeValue(value: string | null): void {
    const raw = (value ?? '').trim();
    if (!raw) {
      this.group.setValue({ country: 'CD', national: '' }, { emitEvent: false });
      this.dialPreview.set('+243');
      return;
    }
    try {
      const parsed = parsePhoneNumberFromString(raw);
      if (parsed?.country) {
        this.group.setValue(
          { country: parsed.country, national: parsed.nationalNumber },
          { emitEvent: false }
        );
        this.dialPreview.set(`+${parsed.countryCallingCode}`);
        return;
      }
    } catch {
      /* ignore */
    }
    this.group.patchValue({ national: raw.replace(/^\+/, '') }, { emitEvent: false });
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) this.group.disable({ emitEvent: false });
    else this.group.enable({ emitEvent: false });
  }

  markTouched(): void {
    this.onTouched();
  }

  private buildCountries(lang: string): CountryOpt[] {
    const dn = new Intl.DisplayNames([lang === 'en' ? 'en' : 'fr'], { type: 'region' });
    const all = getCountries().map((code) => {
      const dial = getCountryCallingCode(code);
      const name = dn.of(code) ?? code;
      return { code, dial, label: `${name} (+${dial})` };
    });

    const preferred = PREFERRED.map((c) => all.find((x) => x.code === c)).filter(
      (x): x is CountryOpt => !!x
    );
    const rest = all
      .filter((x) => !PREFERRED.includes(x.code))
      .sort((a, b) => a.label.localeCompare(b.label, lang === 'en' ? 'en' : 'fr'));
    return [...preferred, ...rest];
  }
}
