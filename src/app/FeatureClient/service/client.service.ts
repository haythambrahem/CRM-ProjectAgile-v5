import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8089/api/clients'; 
  
  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Nouvelle méthode pour obtenir les remises du client
  getClientDiscounts(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${clientId}/discounts`);
  }

  // Nouvelle méthode pour ajouter une remise pour le client
  addClientDiscount(clientId: number, discount: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${clientId}/discounts`, discount);
  }
}
