import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadImgService } from '../../service/upload-img.service';
import { UpdateService } from '../../service/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  selectedImageFile: File | undefined;
  user: any;

  constructor(private updateService: UpdateService, private router: Router, private uploadService: UploadImgService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
  }

  updateProfile() {
    if (this.selectedImageFile) {
      this.uploadService.uploadFile(this.selectedImageFile).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);
          if (response && response.imageURL) {
            this.user.profilePhoto = response.imageURL; // Assuming the property in the user object is profilePhoto
            this.saveUserProfile();
          } else {
            console.error('Error: Image URL not found in response.');
          }
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      this.saveUserProfile();
    }
  }

  saveUserProfile() {
    this.updateService.updateUserProfile(this.user).subscribe(
      (data: any) => {
        console.log('Profile updated successfully:', data);
        this.router.navigate(['/profile']);
      },
      (error: any) => {
        console.error('Error updating user profile:', error);
      }
    );
  }

  getUserProfile() {
    this.updateService.getUserProfile().subscribe(
      (data: any) => {
        this.user = data;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
