import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from '../components/create-user/create-user.component';

const userAccountRoutes: Routes = [
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: '',
    redirectTo: 'create-user',
    pathMatch: 'full'
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(userAccountRoutes)
  ],
  exports: [RouterModule]
})
export class UserAccountRoutingModule { }
