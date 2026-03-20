import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import { CharacterDetails, Episode } from '../../interfaces/character.interface';
import { TranslatePipe } from '../../pipes/t.pipe';
import { RickandmortyService } from '../../services/rickandmorty/rickandmorty.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslatePipe
  ],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.less'
})
export class CharacterDetailComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  loading = false;
  errorMessage = '';

  character: CharacterDetails | null = null;
  episodes: Episode[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly rickandmortyService: RickandmortyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) => {
          if (!Number.isInteger(id) || id < 1) {
            this.errorMessage = 'details.error';
            return of(null);
          }

          this.loading = true;
          this.errorMessage = '';

          return this.rickandmortyService.getCharacterById(id).pipe(
            switchMap((character) =>
              this.rickandmortyService.getEpisodesByUrls(character.episode).pipe(
                map((episodes) => ({ character, episodes }))
              )
            ),
            tap((result) => {
              if (!result) {
                return;
              }

              this.character = result.character;
              this.episodes = result.episodes;
            }),
            catchError((_: HttpErrorResponse) => {
              this.character = null;
              this.episodes = [];
              this.errorMessage = 'details.error';
              return of(null);
            }),
            finalize(() => {
              this.loading = false;
            })
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  trackByEpisode(_: number, episode: Episode): number {
    return episode.id;
  }
}
