import { Routes } from '@angular/router';

export const CHARACTER_DETAIL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./character-detail.component').then((m) => m.CharacterDetailComponent),
    title: 'Rick and Morty | Detalhes'
  }
];
