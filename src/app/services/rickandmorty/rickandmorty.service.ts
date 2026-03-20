import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { CharacterApiResponse, CharacterDetails, Episode } from '../../interfaces/character.interface';
import { BASE_URL } from '../../utils/global';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  constructor(private readonly http: HttpClient) {}

  getCharacters(page: number, name = ''): Observable<CharacterApiResponse> {
    let params = new HttpParams().set('page', page);

    if (name.trim()) {
      params = params.set('name', name.trim());
    }

    return this.http.get<CharacterApiResponse>(`${BASE_URL}/character`, { params });
  }

  getCharacterById(id: number): Observable<CharacterDetails> {
    return this.http.get<CharacterDetails>(`${BASE_URL}/character/${id}`);
  }

  getEpisodesByUrls(urls: string[]): Observable<Episode[]> {
    if (!urls.length) {
      return of([]);
    }

    return forkJoin(urls.map((url) => this.http.get<Episode>(url)));
  }
}
