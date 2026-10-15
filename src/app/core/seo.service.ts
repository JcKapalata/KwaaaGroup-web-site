import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  OG_IMAGE,
  PUBLIC_PATHS,
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN
} from './site-seo';

const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE_NAME} — Construction, Agro, Event & Consulting`,
    description: SITE_DEFAULT_DESCRIPTION
  },
  '/devis': {
    title: `Demander un devis · ${SITE_NAME}`,
    description:
      'Décrivez votre besoin : construction, agro, event & logistique ou consulting. KWAAA Group vous recontacte avec une offre claire.'
  },
  '/partenariat': {
    title: `Devenir partenaire · ${SITE_NAME}`,
    description:
      'Fournisseurs, sous-traitants, institutions et investisseurs : proposez un partenariat à KWAAA Group.'
  },
  '/vision': {
    title: `Notre vision · ${SITE_NAME}`,
    description: 'Là où nous allons, c’est loin — vision et ambition de KWAAA Group en RDC et en Afrique.'
  },
  '/modele': {
    title: `Notre modèle · ${SITE_NAME}`,
    description: 'Comment les branches de KWAAA Group se renforcent mutuellement.'
  },
  '/infrastructures': {
    title: `Construction · ${SITE_NAME}`,
    description: 'Infrastructures, logements et chantiers durables — branche Construction KWAAA Group.'
  },
  '/alimentation': {
    title: `Agro · ${SITE_NAME}`,
    description: 'Sécurité alimentaire : production, transformation et restauration — branche Agro KWAAA Group.'
  },
  '/mobilite': {
    title: `Event & Logistique · ${SITE_NAME}`,
    description: 'Événements et logistique organisés avec méthode — branche Event & Logistique KWAAA Group.'
  },
  '/gestion': {
    title: `Consulting · ${SITE_NAME}`,
    description: 'Communication, marketing et conseil — branche Communication & Consulting KWAAA Group.'
  },
  '/emploi': {
    title: `Emploi des jeunes · ${SITE_NAME}`,
    description: 'Recrutement au mérite, stages rémunérés et responsabilités réelles chez KWAAA Group.'
  },
  '/integrite': {
    title: `Intégrité · ${SITE_NAME}`,
    description: 'Gouvernance, transparence et tolérance zéro — engagements d’intégrité de KWAAA Group.'
  }
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  init(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.applyForUrl(e.urlAfterRedirects));
    this.applyForUrl(this.router.url);
  }

  private applyForUrl(raw: string): void {
    const path = (raw.split('?')[0].split('#')[0] || '/') as (typeof PUBLIC_PATHS)[number] | string;
    const page = PAGE_META[path] ?? {
      title: SITE_NAME,
      description: SITE_DEFAULT_DESCRIPTION
    };
    const url = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;
    const indexable = (PUBLIC_PATHS as readonly string[]).includes(path);

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({
      name: 'robots',
      content: indexable
        ? 'index, follow, max-image-preview:large, max-snippet:-1'
        : 'noindex, nofollow'
    });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: OG_IMAGE });

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
