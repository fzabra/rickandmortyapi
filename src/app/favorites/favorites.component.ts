import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  providers: [FavoritesService]
})
export class FavoritesComponent {

  constructor(private favoritesService: FavoritesService) { }

  favorites: number[] = [];

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }
}