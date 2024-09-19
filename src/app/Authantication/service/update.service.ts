import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private baseUrl = 'http://localhost:8089/user';
  
  constructor(private http: HttpClient) { }

 getUserProfile(): Observable<any> {
  console.log("getting user profile")
  const user = localStorage.getItem('user');
  const userObj = user ? JSON.parse(user) : null
  console.log(userObj?.token)
  const token = userObj?.token || null
    // Check if token exists
    if (!token) {
     
      console.error('Token not found in local storage');
      return throwError('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Make HTTP request with headers
    return this.http.get<any>(`${this.baseUrl}/getCurrent`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateUserProfile(userData: any): Observable<any> {
    console.log("getting user profile")
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null
    console.log(userObj?.token)
    const token = userObj?.token || null  
    // Check if token exists
    if (!token) {
      // Handle the case where token doesn't exist
      // For example, redirect to login page or perform any other action
      console.error('Token not found in local storage');
      return throwError('Token not found');
    }
  
    // Set headers with Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(`${this.baseUrl}/editCurrent`, userData, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle error here
        console.error('Error updating user profile:', error);
        return throwError('Error updating user profile');
      })
    );

  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }}
