import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from '../components/create-user/create-user.component';
import { AllUsersComponent } from '../components/all-users/all-users.component';
import { CreateClientComponent } from '../components/create-client/create-client.component';
import { AllClientComponent } from '../components/all-client/all-client.component';

const userAccountRoutes: Routes = [
  {
    path: 'create-client',
    component: CreateClientComponent
  },
  {
    path: 'all-clients',
    component: AllClientComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'all-users',
    component: AllUsersComponent
  },
  {
    path: '',
    redirectTo: 'create-user',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(userAccountRoutes)
  ],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
