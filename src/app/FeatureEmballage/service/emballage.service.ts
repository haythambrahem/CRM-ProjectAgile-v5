import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emballage } from 'src/app/Model/emballage.model';

@Injectable({
  providedIn: 'root'
})
export class EmballageService {
  private apiUrl = 'http://localhost:8089/api/emballages';

  constructor(private http: HttpClient) {}

  getAllEmballages(): Observable<Emballage[]> {
    return this.http.get<Emballage[]>(this.apiUrl);
  }

  getEmballageById(id: number): Observable<Emballage> {
    return this.http.get<Emballage>(`${this.apiUrl}/${id}`);
  }

  createEmballage(emballage: Emballage): Observable<Emballage> {
    return this.http.post<Emballage>(this.apiUrl, emballage);
  }

  updateEmballage(id: number, emballage: Emballage): Observable<Emballage> {
    return this.http.put<Emballage>(`${this.apiUrl}/${id}`, emballage);
  }

  deleteEmballage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
