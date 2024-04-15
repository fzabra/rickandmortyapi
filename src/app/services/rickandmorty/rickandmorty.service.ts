import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeCharacter } from '../../interfaces/character.interface';
import { BASE_URL } from '../../utils/global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RickandmortyService {
  constructor(private http: HttpClient) {}

  getListCharacters(page: number) {
    return this.http
      .get<any>(BASE_URL + `/character/?page=${page}`)
      .pipe((res) => res);
  }

  searchCharacters(query: string): Observable<TypeCharacter[]> {
    return this.http.get<TypeCharacter[]>(BASE_URL + `/character/?name=${query}`);
  }

  getCharacterNameById(id: number): Observable<string> {
    return this.http.get<TypeCharacter>(BASE_URL + `/character/${id}`).pipe(
      map(character => character.name)
    );
  }
}
