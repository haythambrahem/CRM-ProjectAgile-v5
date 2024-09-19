import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../Model/user';
import { AddUserRequest } from '../componenet/add-employee/add-employee.component';
const apiUrl = 'http://localhost:8089';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrls = 'http://localhost:8089/user';
  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) { }

  loginUser(loginData: {email: string, password: string}): Observable<any> {
    return this.http.post(apiUrl+ '/auth/signin', loginData).pipe(
      tap(user => {
        localStorage.setItem("user", JSON.stringify(user))

        this.setLoggedInUser(user);

      })
    );
  }

  setLoggedInUser(user: any): void {
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser(): Observable<any> {
    return this.loggedInUserSubject.asObservable();
  }

  registerUser(userData: any): Observable<any> {
    // Assurez-vous de passer les données utilisateur (userData) à la méthode post
    return this.http.post(apiUrl + '/auth/signup', userData);
  }

  getLoggedInUserId(): number {
    const loggedInUser = this.loggedInUserSubject.value;
    return loggedInUser ? loggedInUser.id : null;
  }


  private getUserToken(): string {
    /* this.loggedInUserSubject.asObservable().subscribe(u => {
      token = u.token
    }); */
    const user = localStorage.getItem("user")
    if (user) {
      return JSON.parse(user).token
    }

    throw Error("no token")

  }


  searchAllUsers(request: { page: number, size: number, criteria: string, direction: string, searchTerm: string }): Observable<any> {

    const token = this.getUserToken()

    return this.http.get(apiUrl + '/users/', {
      params: {
        ...request
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,

      }
    })

  }
  searchAllUserss(): Observable<any> {
    
    const token = this.getUserToken()

    return this.http.get(apiUrl +'/user/all', {
    
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        
      }
    })
  
  }


   addEmployee(request: AddUserRequest): Observable<any> {

    const token = this.getUserToken();

    return this.http.post(apiUrl + '/user/create', request, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    })
  }

  searchByKeyword(request: { Keyword: string }): Observable<any> {
    const token = this.getUserToken();
    return this.http.post(apiUrl + '/user/search', request, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    })
  }

  /* updatePwd(userData: { currentPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(apiUrl + '/user/editPassword', userData)
      .pipe(
        catchError((error: any) => {
          return throwError('Error updating password');
        })
      );
  } */
  /* updatePwd(userData: { currentPassword: string, newPassword: string }): Observable<any> {
    const token = this.getUserToken(); // Retrieve the user token
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Use template literal for string interpolation
    });
  
    return this.http.post(apiUrl + '/user/editPassword', userData, { headers })
      .pipe(
        catchError((error: any) => {
          return throwError('Error updating password');
        })
      );
  } */
  updatePwd(userData: { oldPassword: string; newPassword: string;retypedNewPassword: string; }): Observable<any> {
    try {
      const token = this.getUserToken(); // Retrieve the user token
        console.log(userData)
        console.log(token)
      return this.http.post(apiUrl + '/user/editPassword',userData ,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        }
      })
        .pipe(
          catchError((error: any) => {
            return throwError('Error updating password');
          })
        );
    } catch (error) {
      console.error('Error retrieving token:', error);
      // Handle the case where the token is missing (e.g., redirect to login)
      return throwError('User not logged in');
    }
  }

  getEmployeeRatio(): Observable<any> {
    const token = this.getUserToken()
    return this.http.get(apiUrl + '/user/task-status', {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
  }
  // Récupérer les données de profil de l'utilisateur
  getUserProfile(): Observable<any> {
    console.log("getting user profile")
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null
    console.log(userObj?.token)
    const token = userObj?.token || null
  
    // Check if token exists
    if (!token) {
     
      console.error('Token not found in local storage');
      throw new Error('Token not found');
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
  console.log("token",token)
    // Make HTTP request with headers
    return this.http.get<any>(`${apiUrl}/getCurrent`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs HTTP
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log error in the console
    return throwError(error); // Throw an error to the caller
  }

  // user/user-task-status
  getGeneraleEmployesData(): Observable<any> {
    const token = this.getUserToken()
    return this.http.get(apiUrl + '/user/user-task-status', {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
  }
  getEmployesData(): Observable<any> {
    const token = this.getUserToken()
    return this.http.get(apiUrl + '/auth/user-project-stat', {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
  }

  ///
  getSpeceficEmployesData(): Observable<any> {
    const token = this.getUserToken()
    return this.http.get(apiUrl + '/user/tasks-by-status', {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
  }

// Méthode pour récupérer un utilisateur par son ID
getUserById(id: number): Observable<User> {
  return this.http.get<User>(apiUrl + '/get/${id}');
}
getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(apiUrl + '/user/retrieve-users');
}
sendPasswordResetLink(email: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrls}/forgot-password`, { email });
}

resetPassword(token: string, newPassword: string): Observable<any> {
  //
  const body = { token, newPassword };
  return this.http.post(`${this.apiUrls}/reset-password`, body);
}

}