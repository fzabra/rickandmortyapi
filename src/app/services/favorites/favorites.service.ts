import { Injectable } from '@angular/core';
import { TypeCharacter } from '../../interfaces/character.interface'; // Substitua pelo caminho correto para o arquivo de interface dos personagens

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  getFavorites(data?: TypeCharacter[]): { id: number, name: string, species?: string }[] {
    const favorites: { id: number, name: string, species?: string }[] = [];

    if (data) {
      // Se os dados foram fornecidos, percorra a lista de personagens e verifique se cada um está presente nos favoritos
      data.forEach(character => {
        // Simule a lógica de verificação se o personagem está nos favoritos (substitua por sua lógica real)
        const isFavorite = this.isCharacterFavorite(character.id); // Substitua por sua lógica real de verificação de favoritos
        if (isFavorite) {
          // Se o personagem estiver nos favoritos, adicione-o à lista de favoritos
          favorites.push({
            id: character.id,
            name: character.name,
            species: character.species // Se a espécie estiver disponível, adicione-a aos favoritos
          });
        }
      });
    }
    console.log('Favoritos:', favorites); 
    // Retorna a lista de favoritos obtida com base nos dados fornecidos
    return favorites;
  }

  // Método de exemplo para verificar se um personagem está nos favoritos (substitua por sua lógica real)
  private isCharacterFavorite(id: number): boolean {
    // Lógica de verificação de favoritos
    // Por enquanto, vamos apenas retornar um valor aleatório (substitua por sua lógica real)
    return Math.random() < 0.5; // Simula 50% de chance de ser favorito
  }
}