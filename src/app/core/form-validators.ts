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
    if (v.length < min) return { minlength: { requiredLength: min, actualLength: v.length } };
    if (v.length > max) return { maxlength: { requiredLength: max, actualLength: v.length } };
    return null;
  };
}
