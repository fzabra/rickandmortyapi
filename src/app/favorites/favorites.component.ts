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
  favorites: { id: number, name: string }[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }
}

