import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from '../../utils/global';


@Injectable({
  providedIn: 'root',
})
export class RickandmortyService {
  constructor(private http: HttpClient) {}

  getListCharacters(page: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/character/?page=${page}`).pipe(
      catchError(error => {
        console.error('Erro ao obter a lista de personagens:', error);
        throw error; // Rejeita o erro para que o componente que está chamando o serviço possa lidar com ele
      })
    );
  }

  searchCharactersByName(name: string): Observable<any> {
    const params = new HttpParams().set('name', name); // Cria parâmetros para a busca por nome
    return this.http.get<any>(`${BASE_URL}/character/`, { params }).pipe(
      catchError(error => {
        console.error('Erro ao buscar personagens pelo nome:', error);
        throw error; // Rejeita o erro para que o componente que está chamando o serviço possa lidar com ele
      })
    );
  }
}
