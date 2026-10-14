/**
 * Coordonnées publiques uniquement — jamais d’URL d’outils internes.
 */
export const PUBLIC_CONTACT = {
  email: 'info@kwaaagroup.com',
  phoneDisplay: '+243 833 081 606',
  phoneTel: '+243833081606',
  address:
    'N° 7, avenue Beni, Quartier Cité Belge, Commune de Bungulu, Beni, Nord-Kivu, RDC',
  legalName: 'KWAAA Group SARL'
} as const;

export const mailto = (subject?: string): string => {
  const base = `mailto:${PUBLIC_CONTACT.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
};

export const telHref = (): string => `tel:${PUBLIC_CONTACT.phoneTel}`;
