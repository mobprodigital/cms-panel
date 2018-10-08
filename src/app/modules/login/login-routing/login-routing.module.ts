import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from '../../../components/not-found/not-found.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
