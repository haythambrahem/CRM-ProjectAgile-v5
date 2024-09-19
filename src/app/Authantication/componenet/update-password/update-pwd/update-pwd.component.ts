import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Authantication/service/user.service';

@Component({
  selector: 'app-update-pwd',
  templateUrl: './update-pwd.component.html',
  styleUrls: ['./update-pwd.component.css']
})
export class UpdatePWDComponent {
  editPasswordRequest = {
    oldPassword: '',
    newPassword: '',
    retypedNewPassword: ''
  };
  errorMessage: string | null = null;

  constructor(private updatePasswordService: UserService, private router: Router) {}

  onSubmit() {
    if (this.editPasswordRequest.newPassword !== this.editPasswordRequest.retypedNewPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      return;
    }

    this.updatePasswordService.updatePwd(this.editPasswordRequest).subscribe(
      response => {
        console.log('Password updated successfully', response);
        // Optionally, navigate to another page or show a success message
        this.router.navigate(['/success']); // Adjust the route as necessary
      },
      error => {
        console.error('Error updating password:', error);
        this.errorMessage = 'Failed to update password. Please try again.';
      }
    );
  }
}
