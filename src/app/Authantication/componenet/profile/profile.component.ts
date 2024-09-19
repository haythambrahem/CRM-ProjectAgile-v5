import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../../service/profile.service';
import { UploadImgService } from '../../service/upload-img.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedImageFile: File | undefined;
  selectedFile: File | null = null;
  selectedPDFFile: File | undefined;
  user: any = {};
  token: string = '';

  constructor(
    private http: HttpClient,
    private service: ProfileService,
    private router: Router,
    private srvc: UploadImgService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      data => {
        this.user = data;
        this.token = data.token;
        console.log("User profile loaded:", data);
      },
      error => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onImageFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
  }

  onPDFSelected(event: any) {
    this.selectedPDFFile = event.target.files[0];
  }

  uploadProfilePhoto() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    if (!this.token) {
      console.error('Token not found');
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };

    this.http.post<any>('http://localhost:8089/user/upload-profile-photo', formData, httpOptions).subscribe(
      response => {
        console.log('Profile photo uploaded successfully:', response);
      },
      error => {
        console.error('Error uploading profile photo:', error);
      }
    );
  }

  uploadProfilePDF() {
    if (this.selectedPDFFile) {
      const formData: FormData = new FormData();
      formData.append('profilePDF', this.selectedPDFFile, this.selectedPDFFile.name);

      this.http.post<any>('http://localhost:3000/uploadProfilePDF', formData).subscribe(
        response => {
          console.log('PDF file uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading PDF file:', error);
        }
      );
    } else {
      console.error('No PDF file selected');
    }
  }

  ajouterImage(callback: () => void) {
    if (this.selectedImageFile) {
      this.srvc.uploadFile(this.selectedImageFile).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
          if (response && response.imageURL) {
            this.user.image = response.imageURL;
            callback();
          } else {
            console.error('Error: Image URL not found in response.');
            callback();
          }
        },
        error => {
          console.error('Error uploading image:', error);
          callback();
        }
      );
    } else {
      console.error('No image selected');
      callback();
    }
  }

  updateProfile() {
    this.service.updateUser(this.user).subscribe(
      updatedUser => {
        this.ajouterImage(() => {
          this.service.updateUser(this.user).subscribe(
            res => {
              this.user.image = '';
            }
          );
        });
        console.log('User updated successfully:', updatedUser);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem("user");
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }

  goBack() {
    this.router.navigate(["/admin"]);
  }

  navigateToUpdate() {
    this.router.navigate(['/update']);
  }
  navigateToUpdatePwd() {
    this.router.navigate(['/edit-password']);
  }

  downloadProfilePdf(): void {
    this.service.downloadProfilePdf().subscribe((data: Blob) => {
      console.log("Profile PDF download response:", data);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
