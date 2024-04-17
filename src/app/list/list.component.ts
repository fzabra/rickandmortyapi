import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { RickandmortyService } from '../services/rickandmorty/rickandmorty.service';
import { TypeCharacter } from '../interfaces/character.interface'
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites/favorites.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, ReactiveFormsModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less'
})
export class ListComponent implements OnInit {
  
  searchQueryControl = new FormControl('', Validators.minLength(3)) as FormControl<string>;
  searchQuery = '';
  filteredCharacters: TypeCharacter[] = [];
  favorites: { id: number, name: string, image: string, species?: string }[] = [];
  loading: boolean = false;
  favoritesCount: number = 0; 
  trackByFn(index: number, item: any): any {
    return item.id;
  }
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
      this.searchCharacters();
    });
  }

  page = 1;
  listCharacters: TypeCharacter[] = [];

  getCharacters(page: number) {
    console.log(`Obtendo personagens da página ${page}`);
    const res = this.rickandmortyService.getListCharacters(page);
    res.subscribe({
      next: (res) => {
        console.log(`Resposta recebida para a página ${page}:`, res);
        const data = res.results;
        this.listCharacters = this.listCharacters.concat(data);
        this.filteredCharacters = this.listCharacters; 
        this.favorites = this.favoritesService.getFavorites(data);
    
        if (res.info.next) {
          const nextPage = page + 1;
          console.log(`Obtendo próxima página: ${nextPage}`);
          this.getCharacters(nextPage);
          this.loading = false;
        } else {
          console.log("Não há mais páginas para carregar.");
          this.loading = true;
        }
      },
      error: (e) => {
        console.log('Erro ao obter personagens:', e);
      },
    });
  }
  
  detailCharacter(id: number) {
    this.route.navigate([`/rickandmorty/detail-character/${id}`]);
  }

  searchCharacters() {
    const query = this.searchQueryControl.value.trim().toLowerCase();
    this.filteredCharacters = this.listCharacters.filter(character =>
      character.name.toLowerCase().includes(query)
    );
  }
    
  toggleFavorite(id: number, name: string, image: string, species?: string) {
    const index = this.favorites.findIndex(favorite => favorite.id === id);
    if (index > -1) {
        this.favorites.splice(index, 1);
    } else {
        this.favorites.push({ id, name, image, species });
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.updateFavoritesCount();
  }

  isFavorite(itemId: number): boolean {
    if (typeof localStorage !== 'undefined') {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            const favorites = JSON.parse(storedFavorites);
            return favorites.some((favorite: any) => favorite.id === itemId);
        }
    }
    return false;
  }

  updateFavoritesCount(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      this.favoritesCount = favorites.length;
    } else {
      this.favoritesCount = 0;
    }
  }
}


