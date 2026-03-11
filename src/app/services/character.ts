import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(name: string = '', status: string = '', page: number = 1): Observable<any> {
    const params = `?page=${page}&name=${encodeURIComponent(name)}&status=${encodeURIComponent(status)}`;
    return this.http.get(`${this.url}${params}`);
  }
}
