import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Authantication/service/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup): any {
    return group.get('newPassword')?.value === group.get('confirmPassword')?.value
      ? null : { notMatching: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.authService.resetPassword(this.token, newPassword).subscribe(
        response => {
          alert('Password reset successfully.');
          this.router.navigate(['/signin']);
        },
        response => {
          alert('Password reset successfully.');
          this.router.navigate(['/signin']);
        }
      );
    }
  }
}
