import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../utils/global';

@Injectable({
  providedIn: 'root',
})
export class DetailCharacterService {
  constructor(private http: HttpClient) {}

  getDetailCharater(id: number) {
    return this.http.get<any>(BASE_URL + `/character/${id}`);
  }
}
