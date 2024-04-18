import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FavoritesService } from '../services/favorites/favorites.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.less',
  providers: [FavoritesService]
})
export class FavoritesComponent implements OnInit {
  favorites: { id: number, name: string, image: string, species?: string }[] = [];

  constructor(
    private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    } else {
      console.error('localStorage is not available.');
    }
  }

  removeFavorite(id: number): void {
    const index = this.favorites.findIndex(favorite => favorite.id === id);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.favoritesService.updateFavoritesInLocalStorage(this.favorites);
    }
    window.dispatchEvent(new Event('favoritesChanged'));
  }
}
