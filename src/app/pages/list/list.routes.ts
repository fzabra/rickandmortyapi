import { Routes } from '@angular/router';

export const LIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./list.component').then((m) => m.ListComponent),
    title: 'Rick and Morty | Busca'
  }
];
