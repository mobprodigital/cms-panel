import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing/login-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatInputModule, MatProgressBarModule } from '@angular/material';

import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FormsModule
  ],
  declarations: [LoginComponent, ResetPasswordComponent, VerifyEmailComponent],
  exports: [LoginRoutingModule]
})
export class LoginModule { }
