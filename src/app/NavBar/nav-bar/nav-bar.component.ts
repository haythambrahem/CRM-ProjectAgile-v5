import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfileService } from 'src/app/Authantication/service/profile.service';
import { UserService } from 'src/app/Authantication/service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user: any;
  token: string = '';
  isLoggedIn: boolean = false;

  constructor(private userService: UserService ,private router: Router,
    private service: ProfileService,
    private translate: TranslateService
  ) { this.translate.setDefaultLang('en');}

    switchLanguage(language: string) {
      this.translate.use(language);
    }
  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user; // Set isLoggedIn to true if user is not null
    });
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
  logout() {
    localStorage.removeItem("user");
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }
}
