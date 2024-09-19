import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecteurActivite } from 'src/app/Model/secteur-activite.model';

@Injectable({
  providedIn: 'root'
})
export class SecteurActiviteService {
  private apiUrl = `http://localhost:8089/api/secteurs`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<SecteurActivite[]> {
    return this.http.get<SecteurActivite[]>(this.apiUrl);
  }

  getById(id: number): Observable<SecteurActivite> {
    return this.http.get<SecteurActivite>(`${this.apiUrl}/${id}`);
  }

  create(secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.http.post<SecteurActivite>(this.apiUrl, secteurActivite);
  }

  update(id: number, secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.http.put<SecteurActivite>(`${this.apiUrl}/${id}`, secteurActivite);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
