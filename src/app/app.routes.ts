import { Routes } from '@angular/router';
import { FavoritesComponent } from './pages/favorites/favorites.component'

export const routes: Routes = [
    {
        path: 'favorites',
        component: FavoritesComponent,
        title: 'Favoritos'
    }
];
