import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  forwardRef,
  inject,
  input,
  signal,
  viewChild
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
  name: string;
  flag: string;
  /** Texte pour le filtre (nom, code, indicatif). */
  search: string;
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

/** Drapeau emoji à partir du code ISO (ex. CD → 🇨🇩). */
export function countryFlag(code: string): string {
  const cc = code.toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return '🏳️';
  return String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)));
}

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
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly i18n = inject(LangService);

  readonly invalid = input(false);
  readonly inputId = input('phone-national');

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private onChange: (v: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  readonly countries = computed(() => this.buildCountries(this.i18n.lang()));
  readonly open = signal(false);
  readonly query = signal('');
  readonly activeIndex = signal(0);

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
    const list = this.countries();
    if (!q) return list;
    return list.filter((c) => c.search.includes(q));
  });

  readonly selected = computed(() => {
    const code = (this.group.controls.country.value || 'CD') as CountryCode;
    return this.countries().find((c) => c.code === code) ?? this.countries()[0];
  });

  readonly group = this.fb.nonNullable.group({
    country: 'CD' as CountryCode,
    national: ''
  });

  readonly dialPreview = signal('+243');

  readonly ui = computed(() =>
    this.i18n.lang() === 'en'
      ? {
          country: 'Country code',
          search: 'Search country or code…',
          empty: 'No country found'
        }
      : {
          country: 'Indicatif pays',
          search: 'Rechercher un pays ou un code…',
          empty: 'Aucun pays trouvé'
        }
  );

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

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent): void {
    if (!this.open()) return;
    if (!this.host.nativeElement.contains(ev.target as Node)) {
      this.closePanel();
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.open()) this.closePanel();
  }

  togglePanel(): void {
    if (this.open()) this.closePanel();
    else this.openPanel();
  }

  openPanel(): void {
    this.open.set(true);
    this.query.set('');
    const code = this.group.controls.country.value;
    const idx = this.filtered().findIndex((c) => c.code === code);
    this.activeIndex.set(idx >= 0 ? idx : 0);
    queueMicrotask(() => this.searchInput()?.nativeElement.focus());
  }

  closePanel(): void {
    this.open.set(false);
    this.query.set('');
    this.markTouched();
  }

  selectCountry(c: CountryOpt): void {
    this.group.controls.country.setValue(c.code);
    this.closePanel();
  }

  onSearchInput(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value;
    this.query.set(v);
    this.activeIndex.set(0);
  }

  onListKeydown(ev: KeyboardEvent): void {
    const list = this.filtered();
    if (!list.length) return;
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      this.activeIndex.update((i) => Math.min(i + 1, list.length - 1));
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      this.activeIndex.update((i) => Math.max(i - 1, 0));
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      const item = list[this.activeIndex()];
      if (item) this.selectCountry(item);
    }
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
    const locale = lang === 'en' ? 'en' : 'fr';
    const dn = new Intl.DisplayNames([locale], { type: 'region' });
    const all = getCountries().map((code) => {
      const dial = getCountryCallingCode(code);
      const name = dn.of(code) ?? code;
      const flag = countryFlag(code);
      const search = `${name} ${code} +${dial} ${dial}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{M}/gu, '');
      return { code, dial, name, flag, search };
    });

    const preferred = PREFERRED.map((c) => all.find((x) => x.code === c)).filter(
      (x): x is CountryOpt => !!x
    );
    const rest = all
      .filter((x) => !PREFERRED.includes(x.code))
      .sort((a, b) => a.name.localeCompare(b.name, locale));
    return [...preferred, ...rest];
  }
}
