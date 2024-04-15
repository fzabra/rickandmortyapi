import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  getFavorites(): { id: number, name: string, species: string }[] {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      return JSON.parse(favorites).map((id: number) => ({ id, name: '', species: '' }));
    } else {
      return [];
    }
  }
}