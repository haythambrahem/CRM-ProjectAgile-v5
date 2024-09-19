import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:8089/jasper'; 

  constructor(private http: HttpClient) { }

  // Existing method for general client report
  getClientReport(fileType: string): Observable<Blob> {
    const params = new HttpParams().set('fileType', fileType);
    return this.http.get(`${this.apiUrl}/client-report`, { responseType: 'blob', params });
  }

  // New method for specific client report
  getSpecificClientReport(id: number, fileType: string): Observable<Blob> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('fileType', fileType);
    return this.http.get(`${this.apiUrl}/specific-client-report`, { responseType: 'blob', params });
  }
  // New method for devis report
  getDevisReport(id: number, fileType: string): Observable<Blob> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('fileType', fileType);
    return this.http.get(`${this.apiUrl}/devis-report`, { responseType: 'blob', params });
  }
}
