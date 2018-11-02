import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from '../components/create-user/create-user.component';
import { AllUsersComponent } from '../components/all-users/all-users.component';
import { CreateClientComponent } from '../components/create-client/create-client.component';
import { AllClientComponent } from '../components/all-client/all-client.component';
import { CreateSuperAdminComponent } from '../components/create-super-admin/create-super-admin.component';
import { AllSuperAdminsComponent } from '../components/all-super-admins/all-super-admins.component';

const userAccountRoutes: Routes = [
  {
    path: 'create-client',
    component: CreateClientComponent
  },
  {
    path: 'edit-client/:id',
    component: CreateClientComponent
  },
  {
    path: 'all-clients',
    component: AllClientComponent
  },
  {
    path : 'create-superadmin',
    component : CreateSuperAdminComponent
  },
  {
    path : 'create-superadmin/:clientId',
    component : CreateSuperAdminComponent
  },
  {
    path : 'edit-superadmin/:clientId/:userId',
    component : CreateSuperAdminComponent
  },
  {
    path : 'all-superadmins',
    component : AllSuperAdminsComponent
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
