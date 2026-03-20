import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoriteCharacter } from '../../interfaces/character.interface';
import { TranslatePipe } from '../../pipes/t.pipe';
import { FavoritesService } from '../../services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslatePipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.less'
})
export class FavoritesComponent {
  readonly favorites$: Observable<FavoriteCharacter[]> = this.favoritesService.favorites$;

  constructor(private readonly favoritesService: FavoritesService) {}

  removeFavorite(characterId: number): void {
    this.favoritesService.removeFavorite(characterId);
  }

  trackByFavorite(_: number, favorite: FavoriteCharacter): number {
    return favorite.id;
  }
}
