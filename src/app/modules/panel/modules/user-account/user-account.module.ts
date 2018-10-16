import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserAccountRoutingModule } from './user-account-routing/user-account-routing.module';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { MatCardModule, MatTableModule, MatInputModule, MatSelectModule, MatButtonModule, MatListModule, MatExpansionModule, MatIconModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { AllClientComponent } from './components/all-client/all-client.component';
import { AjaxService } from 'src/app/services/ajax/ajax.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [UserAccountComponent, CreateUserComponent, AllUsersComponent, CreateClientComponent, AllClientComponent],
  exports: [UserAccountRoutingModule],
  providers : [AjaxService, UserAccountService]
})
export class UserAccountModule { }
