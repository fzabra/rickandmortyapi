import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FavoritesService } from '../services/favorites/favorites.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.less',
  providers: [FavoritesService]
})
export class FavoritesComponent {
  favorites: { id: number, name: string, image: string, species?: string }[] = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }
}

