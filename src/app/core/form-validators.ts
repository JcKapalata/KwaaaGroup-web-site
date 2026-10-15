import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidPhoneNumber } from 'libphonenumber-js';

/** E-mail : vide = OK ; sinon format valide. */
export function optionalEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = String(control.value ?? '').trim();
    if (!v) return null;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : { email: true };
  };
}

/** E-mail obligatoire + format. */
export function requiredEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = String(control.value ?? '').trim();
    if (!v) return { required: true };
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : { email: true };
  };
}

/** Téléphone E.164 (ex. +243…) via libphonenumber-js. */
export function phoneE164(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = String(control.value ?? '').trim();
    if (!v) return { required: true };
    try {
      return isValidPhoneNumber(v) ? null : { phone: true };
    } catch {
      return { phone: true };
    }
  };
}

export function minMaxLen(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = String(control.value ?? '').trim();
    if (!v) return null;
    if (v.length < min) {
      return { minlength: { requiredLength: min, actualLength: v.length, min, max } };
    }
    if (v.length > max) {
      return { maxlength: { requiredLength: max, actualLength: v.length, min, max } };
    }
    return null;
  };
}

/** Message d’aide min/max pour les utilisateurs. */
export function lengthErrMsg(
  errors: ValidationErrors | null,
  lang: 'fr' | 'en'
): string | null {
  if (!errors) return null;
  const en = lang === 'en';
  const short = errors['minlength'] as
    | { requiredLength: number; actualLength: number; min?: number; max?: number }
    | undefined;
  const long = errors['maxlength'] as
    | { requiredLength: number; actualLength: number; min?: number; max?: number }
    | undefined;
  if (short) {
    const min = short.min ?? short.requiredLength;
    const max = short.max;
    if (max != null) {
      return en
        ? `Between ${min} and ${max} characters (currently ${short.actualLength}).`
        : `Entre ${min} et ${max} caractères (actuellement ${short.actualLength}).`;
    }
    return en
      ? `Minimum ${min} characters (currently ${short.actualLength}).`
      : `Minimum ${min} caractères (actuellement ${short.actualLength}).`;
  }
  if (long) {
    const max = long.max ?? long.requiredLength;
    const min = long.min;
    if (min != null) {
      return en
        ? `Between ${min} and ${max} characters (currently ${long.actualLength}).`
        : `Entre ${min} et ${max} caractères (actuellement ${long.actualLength}).`;
    }
    return en
      ? `Maximum ${max} characters (currently ${long.actualLength}).`
      : `Maximum ${max} caractères (actuellement ${long.actualLength}).`;
  }
  return null;
}
