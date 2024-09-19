import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import {RedirectorService} from '../../service/redirector.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email: string = '';
  password: string = '';
  user: any;
  token: string = '';

  constructor(private service: UserService, private router: Router, private redirect: RedirectorService) {}

  ngOnInit(): void {
    this.service.getUserProfile().subscribe (data => {
      this.user = data
      console.log("thes is the response",data);
      this.token = data.token;
      this.redirect.redirectUser(data); // Add this line to redirect based on user's role
    } ); 
  }

  signin() {
    const bodyData = {
      email: this.email,
      password: this.password,
    };
    sessionStorage.setItem("username",bodyData.email);

    this.service.loginUser(bodyData).subscribe(
      (user: any) => {
        // Handle successful login
        this.redirect.redirectUser(user);
      },
      (error) => {
        // Handle errors here
        console.log("Error occurred while logging in:", error);
      }
    );
  }

}
