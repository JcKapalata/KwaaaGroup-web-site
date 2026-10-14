import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

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
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
