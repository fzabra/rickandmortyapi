import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { FavoriteCharacter } from '../../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly storageKey = 'rm-favorites';
  private readonly favoritesSubject = new BehaviorSubject<FavoriteCharacter[]>(this.getInitialFavorites());

  readonly favorites$ = this.favoritesSubject.asObservable();
  readonly favoritesCount$ = this.favorites$.pipe(map((favorites) => favorites.length));

  addFavorite(character: FavoriteCharacter): void {
    if (this.isFavorite(character.id)) {
      return;
    }

    const updated = [...this.favoritesSubject.value, character];
    this.updateState(updated);
  }

  removeFavorite(characterId: number): void {
    const updated = this.favoritesSubject.value.filter((favorite) => favorite.id !== characterId);
    this.updateState(updated);
  }

  toggleFavorite(character: FavoriteCharacter): void {
    if (this.isFavorite(character.id)) {
      this.removeFavorite(character.id);
      return;
    }

    this.addFavorite(character);
  }

  isFavorite(characterId: number): boolean {
    return this.favoritesSubject.value.some((favorite) => favorite.id === characterId);
  }

  private updateState(favorites: FavoriteCharacter[]): void {
    this.favoritesSubject.next(favorites);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  private getInitialFavorites(): FavoriteCharacter[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }

    const saved = localStorage.getItem(this.storageKey);
    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved) as FavoriteCharacter[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
