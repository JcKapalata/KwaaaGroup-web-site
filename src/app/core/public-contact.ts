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

export type SocialNetwork = 'x' | 'facebook' | 'instagram' | 'tiktok' | 'linkedin';

export interface SocialLink {
  id: SocialNetwork;
  label: string;
  href: string;
}

/** Réseaux officiels KWAAA Group */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'x', label: 'X', href: 'https://x.com/kwaaagroup' },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1DMdyM3RiV/?mibextid=wwXIfr'
  },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kwaaa_group' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@kwaaagroup' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/kwaaa-group/'
  }
] as const;

export const mailto = (subject?: string): string => {
  const base = `mailto:${PUBLIC_CONTACT.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
};

export const telHref = (): string => `tel:${PUBLIC_CONTACT.phoneTel}`;
