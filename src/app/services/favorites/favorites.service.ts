import { Injectable } from '@angular/core';
import { TypeCharacter } from '../../interfaces/character.interface'; 

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  getFavorites(data?: TypeCharacter[]): { id: number, name: string, image: string, species?: string }[] {
    const favorites: { id: number, name: string, image: string, species?: string }[] = [];

    if (data) {
      data.forEach(character => {
        const isFavorite = this.isCharacterFavorite(character.id); 
        if (isFavorite) {
          favorites.push({
            id: character.id,
            name: character.name,
            image: character.image,
            species: character.species 
          });
        }
      });
    }
    console.log('Favoritos:', favorites); 
    return favorites;
  }
  
  private isCharacterFavorite(id: number): boolean {
    return false;
  }
}