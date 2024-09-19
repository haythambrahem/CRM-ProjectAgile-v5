import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Authantication/componenet/signin/signin.component';
import { SignupComponent } from './Authantication/componenet/signup/signup.component';
import { ProfileComponent } from './Authantication/componenet/profile/profile.component';
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
import { ChatComponent } from './chat/chat.component';
import { AddEmployeeComponent } from './Authantication/componenet/add-employee/add-employee.component';
import { HomeComponent } from './Home/home/home.component';
import { UpdatePWDComponent } from './Authantication/componenet/update-password/update-pwd/update-pwd.component';
import { ResetPasswordComponent } from './Authantication/componenet/update-password/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'clients', component: ClientManagementComponent },
  { path: 'clients/edit/:id', component: ClientEditComponent },
  { path: 'home', component: HomeComponent },
  { path: 'remis/:clientId', component: DiscountDetailComponent },
  { path: 'secteurActivite', component: SecteurActiviteComponent },
  { path: 'prospects', component: ProspectComponent },
  { path: 'produit', component: ProduitComponent },
  { path: 'emballage', component: EmballageComponent },
  { path: 'devis', component: DevisComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'add', component: AddEmployeeComponent},
  { path: 'edit-password', component: UpdatePWDComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
