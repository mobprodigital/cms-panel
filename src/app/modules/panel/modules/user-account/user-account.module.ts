import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserAccountRoutingModule } from './user-account-routing/user-account-routing.module';
import { UserAccountComponent } from './components/user-account/user-account.component';

@NgModule({
  imports: [
    CommonModule,
    UserAccountRoutingModule
  ],
  declarations: [UserAccountComponent, CreateUserComponent],
  exports: [UserAccountRoutingModule]
})
export class UserAccountModule { }
