import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ObservableInput, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectorService {
  constructor(private router: Router) { }

  redirectUser(user: any): void {
    console.log('User object:', user); // Debug log
    const allowedRoles = ['ROLE_ADMIN'];
    if (user && user.roles && user.roles.some((role: string) => allowedRoles.includes(role))) {
      this.router.navigate(["/"]);
    } else {
      this.router.navigate(["/"]);
    }
  }
}



