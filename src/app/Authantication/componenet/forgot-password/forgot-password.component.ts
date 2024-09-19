import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string="";

  constructor(private authService: UserService) { }

  submitForgotPasswordForm() {
    if (this.email) {
      this.authService.sendPasswordResetLink(this.email).subscribe(
        response => {
          console.log('Password reset link sent', response);
          alert('Password reset link has been sent to your email.');
        },
        error => {
          console.error('Error sending password reset link', error);
          alert('Failed to send password reset link. Please try again later.');
        }
      );
    }
    // Send email address to backend for password reset
    console.log('Email Address:', this.email);

    // Clear form field after submission
    this.email = '';
  }
}
