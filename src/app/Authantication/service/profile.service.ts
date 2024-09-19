import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8089/user'; // Update this URL as needed
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getCompletedProjectsStatistics(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Project/completed-future`).pipe(
      catchError(this.handleError)
    );
  }

  getUserProfile(): Observable<any> {
    console.log("Getting user profile");
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    const token = userObj?.token || null;

    if (!token) {
      console.error('Token not found in local storage');
      return throwError(() => new Error('Token not found'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/getCurrent`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }

  updateUser(userData: any): Observable<any> {
    const userId = this.getLoggedInUserId();
    
    if (userId) {
      return this.http.put(`${this.baseUrl}/update/${userId}`, userData).pipe(
        catchError(this.handleError)
      );
    } else {
      return throwError(() => new Error('Update failed: User not logged in'));
    }
  }

  getLoggedInUserId(): number | null {
    const loggedInUser = this.loggedInUserSubject.value;
    return loggedInUser ? loggedInUser.id : null;
  }

  downloadProfilePdf(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/profile`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('An error occurred. Please try again later.'));
  }
}
