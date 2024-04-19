import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  page = 1;
  listCharacters: TypeCharacter[] = [];
  trackByFn(index: number, item: any): any {
    return item.id;
  }
  constructor(
    private rickandmortyService: RickandmortyService,
    private favoritesService: FavoritesService,
    private route: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCharacters(1);
    this.searchQueryControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((value) => {
      this.searchCharacters();
    });
    this.loadCharacters();
  }

  getCharacters(page: number): Observable<any> {
    return this.rickandmortyService.getListCharacters(page).pipe(
        map((response: any) => {
            return {
                results: response.results,
                totalPages: response.info.pages
            };
        })
    );
  }
  
  loadCharacters() {
    let totalPages = 0;
    let currentPage = 1;
    this.loading = true;
    this.getCharacters(currentPage).subscribe((response: any) => {
      totalPages = response.totalPages;
      this.listCharacters = response.results;
      this.filteredCharacters = this.listCharacters;
      this.favorites = this.favoritesService.getFavorites(this.listCharacters);
      this.loading = false;
      currentPage++;
    });
  
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (currentPage <= totalPages) {
          this.loading = true;
          this.getCharacters(currentPage).subscribe((response: any) => {
            this.listCharacters = this.listCharacters.concat(response.results);
            this.filteredCharacters = this.listCharacters;
            this.favorites = this.favoritesService.getFavorites(this.listCharacters);
            this.loading = false;
            currentPage++;
          });
        }
      }
    });
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
    window.dispatchEvent(new Event('favoritesChanged'));
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
}
