import { CanMatchFn, Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { ARTICLE_ORDER, ArticleSlug } from './features/articles/articles-content';

const isArticle: CanMatchFn = (_route, segments) => {
  const slug = segments[0]?.path ?? '';
  return ARTICLE_ORDER.includes(slug as ArticleSlug);
};

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
        title: 'Kwaaa Group'
      },
      {
        path: 'devis',
        loadComponent: () =>
          import('./features/devis/devis-page/devis-page.component').then(
            (m) => m.DevisPageComponent
          ),
        title: 'Devis · Kwaaa Group'
      },
      {
        path: 'partenariat',
        loadComponent: () =>
          import('./features/partenariat/partenariat-page/partenariat-page.component').then(
            (m) => m.PartenariatPageComponent
          ),
        title: 'Partenariat · Kwaaa Group'
      },
      {
        path: ':slug',
        canMatch: [isArticle],
        loadComponent: () =>
          import('./features/articles/article-page/article-page.component').then(
            (m) => m.ArticlePageComponent
          ),
        title: 'Kwaaa Group'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
