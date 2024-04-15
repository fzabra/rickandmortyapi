import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { RickandmortyService } from '../services/rickandmorty/rickandmorty.service';
import { TypeCharacter } from '../interfaces/character.interface'
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites/favorites.service'; 

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less'
})
export class ListComponent implements OnInit {
  searchQueryControl = new FormControl('', Validators.minLength(3)) as FormControl<string>;
  searchQuery = '';
  filteredCharacters: TypeCharacter[] = [];
  favorites: { id: number, name: string, image: string }[] = [];
  constructor(
    private rickandmortyService: RickandmortyService,
    private favoritesService: FavoritesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getCharacters(1);
    this.searchQueryControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((value) => {
      console.log("Aqui o valor", value);
      this.searchCharacters();
    });
  }

  page = 1;
  listCharacters: TypeCharacter[] = [];

  getCharacters(page: number) {
    console.log('Obtendo personagens da página', page);
    const res = this.rickandmortyService.getListCharacters(page);
    res.subscribe({
      next: (res) => {
        const data = res.results;
        console.log('Data:', data); 
        this.listCharacters = this.listCharacters.concat(data);
        this.filteredCharacters = this.listCharacters; 
        this.favorites = this.favoritesService.getFavorites(data);
    
        if (res.info.next) {
          const nextPage = page + 1;
          this.getCharacters(nextPage);
        }
      },
      error: (e) => console.log(e),
    });
  }
  
  detailCharacter(id: number) {
    this.route.navigate([`/rickandmorty/detail-character/${id}`]);
  }

  searchCharacters() {
    console.log('Buscando personagens...');
    const query = this.searchQueryControl.value.trim().toLowerCase();
    console.log('Query:', query);
    this.filteredCharacters = this.listCharacters.filter(character =>
      character.name.toLowerCase().includes(query)
    );
    console.log('Personagens filtrados:', this.filteredCharacters);
  }

  private async getNameById(id: number): Promise<string> {
    try {
      const name = await this.rickandmortyService.getCharacterNameById(id).toPromise();
      return name || '';
    } catch (error) {
      console.error('Erro ao obter o nome do personagem:', error);
      return '';
    }
  }
  
  toggleFavorite(id: number, name: string, image: string) {
    const index = this.favorites.findIndex(favorite => favorite.id === id);
    if (index > -1) {
        this.favorites.splice(index, 1);
    } else {
        this.favorites.push({ id, name, image });
    }
    console.log('Favoritos atualizados:', this.favorites);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
}
}


