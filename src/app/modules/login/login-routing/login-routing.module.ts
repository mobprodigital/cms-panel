import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from '../../../components/not-found/not-found.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { VerifyEmailComponent } from '../components/verify-email/verify-email.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-password',
    component: ResetPasswordComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
  
]

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
