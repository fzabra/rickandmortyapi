import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/list/list.routes').then((m) => m.LIST_ROUTES),
    pathMatch: 'full'
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.routes').then((m) => m.FAVORITES_ROUTES)
  },
  {
    path: 'character/:id',
    loadChildren: () =>
      import('./pages/character-detail/character-detail.routes').then((m) => m.CHARACTER_DETAIL_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
