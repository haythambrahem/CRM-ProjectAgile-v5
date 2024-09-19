import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  termsAccepted: any;

  constructor(private http: HttpClient, private service: UserService, private router: Router) {}

  signup() {
    // Check if the password is strong before proceeding with registration
    
      let bodyData = {
       
        "email": this.email,
        "password": this.password
      }; 

      this.http.post("http://localhost:8089/auth/signup", 
      bodyData, { responseType: 'text' }).subscribe(
        (resultData: any) => {
          console.log(resultData);
         // alert("User Registered Successfully");

         this.router.navigateByUrl('/signin');
        },
        (error) => {
          // Handle errors here
          console.error('Error during signup:', error);
        }
        
      );
    }
  
}
