import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserAccountRoutingModule } from './user-account-routing/user-account-routing.module';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { MatCardModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [UserAccountComponent, CreateUserComponent],
  exports: [UserAccountRoutingModule, MatCardModule]
})
export class UserAccountModule { }
