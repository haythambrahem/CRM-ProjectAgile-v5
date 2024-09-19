import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './Authantication/componenet/signin/signin.component';
import { SignupComponent } from './Authantication/componenet/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './Authantication/componenet/update/update.component';
import { ForgotPasswordComponent } from './Authantication/componenet/forgot-password/forgot-password.component';
import { ClientManagementComponent } from './FeatureClient/Component/client-management.component';
import { SecteurActiviteComponent } from './FeatureClient/Component/SecteurActivite/SecteurActivite.component';
import { ProspectComponent } from './FeatureProspect/component/prospect.component';
import { ProduitComponent } from './FeatureProduit/component/produit/produit.component';
import { EmballageComponent } from './FeatureEmballage/component/emballage/emballage.component';
import { DevisComponent } from './FeatureDevis/component/devis/devis.component';
import { DiscountDetailComponent } from './FeatureClient/Component/Discount/discount-detail.component';
import { ClientEditComponent } from './FeatureClient/Component/UpdateClient/client-edit.component';
import { MainComponent } from './mainChat/main.component';
import { ChatComponent } from './chat/chat.component';
import { AddEmployeeComponent } from './Authantication/componenet/add-employee/add-employee.component';
import { NavBarComponent } from './NavBar/nav-bar/nav-bar.component';
import { HomeComponent } from './Home/home/home.component';
import { UpdatePWDComponent } from './Authantication/componenet/update-password/update-pwd/update-pwd.component';
import { ResetPasswordComponent } from './Authantication/componenet/update-password/reset-password/reset-password.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProfileComponent } from './Authantication/componenet/profile/profile.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UpdateComponent,
    ForgotPasswordComponent,
    ClientManagementComponent,
    SecteurActiviteComponent,
    ProspectComponent,
    ProduitComponent,
    EmballageComponent,
    DevisComponent,
    DiscountDetailComponent,
    ClientEditComponent, 
    AppComponent,
    MainComponent,
    ChatComponent,
    AddEmployeeComponent,
    NavBarComponent,
    HomeComponent,
    UpdatePWDComponent,
    ResetPasswordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
