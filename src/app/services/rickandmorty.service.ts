import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  // Método para obter todos os personagens
  getCharacters(): Observable<any> {
    return this.http.get(`${this.apiUrl}/character`);
  }

  // Método para obter um personagem específico pelo ID
  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }

  // Outros métodos para acessar diferentes endpoints da API, como episódios, locais, etc.
}
