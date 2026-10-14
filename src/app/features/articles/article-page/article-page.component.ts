import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject
} from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LangService } from '../../../core/i18n/lang.service';
import { NavReturnService } from '../../../core/nav-return.service';
import {
  ARTICLE_ORDER,
  ArticleSlug,
  articleBySlug,
  nextArticles
} from '../articles-content';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { TextRevealDirective } from '../../../shared/directives/text-reveal.directive';
import { CursorTiltDirective } from '../../../shared/directives/cursor-tilt.directive';
import { RememberReturnDirective } from '../../../shared/directives/remember-return.directive';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [
    RouterLink,
    ScrollRevealDirective,
    TextRevealDirective,
    CursorTiltDirective,
    RememberReturnDirective
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly lang = inject(LangService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly navReturn = inject(NavReturnService);
  private readonly title = inject(Title);

  constructor() {
    effect(() => {
      const c = this.copy();
      if (c) this.title.setTitle(`${c.title} · Kwaaa Group`);
    });
  }

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? 'vision')),
    { initialValue: 'vision' }
  );

  readonly article = computed(() => {
    this.lang.lang();
    return articleBySlug(this.slug());
  });

  readonly copy = computed(() => {
    const a = this.article();
    if (!a) return null;
    const l = this.lang.lang();
    return {
      tag: a.tag[l],
      ...a[l],
      body: this.sanitizer.bypassSecurityTrustHtml(a[l].bodyHtml)
    };
  });

  readonly related = computed(() => {
    this.lang.lang();
    const slug = this.slug() as ArticleSlug;
    if (!ARTICLE_ORDER.includes(slug)) return [];
    return nextArticles(slug).map((s) => {
      const a = articleBySlug(s)!;
      const l = this.lang.lang();
      return { slug: s, tag: a.tag[l], title: a[l].title, lead: a[l].lead };
    });
  });

  readonly ui = computed(() => {
    const en = this.lang.lang() === 'en';
    return {
      back: en ? '← Back' : '← Retour',
      brief: en ? 'In brief' : 'En bref',
      next: en ? 'Read next' : 'À lire aussi',
      ctaTitle: en ? 'A project in mind?' : 'Un projet en tête ?',
      ctaDevis: en ? 'Request a quote' : 'Demander un devis',
      ctaPartner: en ? 'Become a partner →' : 'Devenir partenaire →'
    };
  });

  goBack(): void {
    this.navReturn.goBack('/');
  }
}
