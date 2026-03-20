import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, of, startWith, switchMap, tap } from 'rxjs';
import { Character, FavoriteCharacter } from '../../interfaces/character.interface';
import { TranslatePipe } from '../../pipes/t.pipe';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { RickandmortyService } from '../../services/rickandmorty/rickandmorty.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    TranslatePipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less'
})
export class ListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly searchControl = new FormControl('', { nonNullable: true });

  characters: Character[] = [];
  favoriteIds = new Set<number>();

  loading = false;
  notFound = false;
  errorMessage = '';

  totalCharacters = 0;
  currentPage = 1;
  readonly pageSize = 20;

  private currentQuery = '';

  constructor(
    private readonly rickandmortyService: RickandmortyService,
    private readonly favoritesService: FavoritesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.favoritesService.favorites$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((favorites) => {
        this.favoriteIds = new Set(favorites.map((favorite) => favorite.id));
      });

    this.searchControl.valueChanges
      .pipe(
        startWith(this.searchControl.value),
        map((query) => query.trim()),
        debounceTime(350),
        distinctUntilChanged(),
        tap((query) => {
          this.currentQuery = query;
          this.currentPage = 1;
        }),
        switchMap(() => this.fetchCharacters(1)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    this.fetchCharacters(page)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  toggleFavorite(character: Character): void {
    const favorite: FavoriteCharacter = {
      id: character.id,
      name: character.name,
      image: character.image,
      gender: character.gender
    };

    this.favoritesService.toggleFavorite(favorite);
  }

  onToggleFavorite(event: MouseEvent, character: Character): void {
    event.stopPropagation();
    this.toggleFavorite(character);
  }

  openDetails(characterId: number): void {
    this.router.navigate(['/character', characterId]);
  }

  isFavorite(characterId: number): boolean {
    return this.favoriteIds.has(characterId);
  }

  trackByCharacter(_: number, character: Character): number {
    return character.id;
  }

  private fetchCharacters(page: number) {
    this.loading = true;
    this.errorMessage = '';
    this.notFound = false;

    return this.rickandmortyService.getCharacters(page, this.currentQuery).pipe(
      tap((response) => {
        this.characters = response.results;
        this.totalCharacters = response.info.count;
        this.currentPage = page;
      }),
      catchError((error: HttpErrorResponse) => {
        this.characters = [];
        this.totalCharacters = 0;
        this.currentPage = 1;

        if (error.status === 404) {
          this.notFound = true;
        } else {
          this.errorMessage = 'search.error';
        }

        return of(null);
      }),
      map(() => void 0),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
