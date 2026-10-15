/**
 * SEO / crawlers — données publiques uniquement (aucune URL manager / API interne).
 */
export const SITE_ORIGIN = 'https://www.kwaaagroup.com';

export const SITE_NAME = 'KWAAA Group';

export const SITE_DEFAULT_DESCRIPTION =
  'KWAAA Group SARL — groupe congolais à vocation africaine : construction, agro, event & logistique, communication & consulting. Siège à Beni, Nord-Kivu, RDC.';

/** Chemins publics indexables (site vitrine uniquement). */
export const PUBLIC_PATHS = [
  '/',
  '/devis',
  '/partenariat',
  '/vision',
  '/modele',
  '/infrastructures',
  '/alimentation',
  '/mobilite',
  '/gestion',
  '/emploi',
  '/integrite'
] as const;

export const OG_IMAGE = `${SITE_ORIGIN}/icons/icon-512x512.png`;
