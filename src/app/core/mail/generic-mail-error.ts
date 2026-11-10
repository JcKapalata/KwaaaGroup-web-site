/** Message d’erreur unique — jamais de détail API / stack. */
export function genericMailError(lang: 'fr' | 'en'): string {
  return lang === 'en'
    ? 'Something went wrong. Please try again in a moment, or copy your request.'
    : 'Une erreur est survenue. Réessayez dans un instant, ou copiez votre demande.';
}
