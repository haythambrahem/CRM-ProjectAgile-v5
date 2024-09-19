import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discount } from 'src/app/Model/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountDetailService {
  private baseUrl = 'http://localhost:8089/api/clients'; // Base URL without clientId

  constructor(private http: HttpClient) { }

  // Fetch discounts for a specific client
  getDiscountsByClientId(clientId: number): Observable<Discount[]> {
    const url = `${this.baseUrl}/${clientId}/discounts`;
    return this.http.get<Discount[]>(url);
  }

  // Add a discount for a specific client
  addDiscount(clientId: number, discount: Discount): Observable<Discount> {
    const url = `${this.baseUrl}/${clientId}/discounts`;
    return this.http.post<Discount>(url, discount);
  }

  // Delete a discount by ID
  deleteDiscount(id: number): Observable<void> {
    const url = `${this.baseUrl}/discounts/${id}`;
    return this.http.delete<void>(url);
  }
}
