import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prospect } from 'src/app/Model/prospect.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  private apiUrl = 'http://localhost:8089/api/prospects'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getAllProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(this.apiUrl);
  }

  getProspectById(id: number): Observable<Prospect> {
    return this.http.get<Prospect>(`${this.apiUrl}/${id}`);
  }

  createProspect(prospect: Prospect): Observable<Prospect> {
    return this.http.post<Prospect>(this.apiUrl, prospect);
  }

  updateProspect(id: number, prospect: Prospect): Observable<Prospect> {
    return this.http.put<Prospect>(`${this.apiUrl}/${id}`, prospect);
  }

  deleteProspect(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
