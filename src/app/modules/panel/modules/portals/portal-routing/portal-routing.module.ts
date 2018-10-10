import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePortalComponent } from '../components/create-portal/create-portal.component';
import { AllPortalsComponent } from '../components/all-portals/all-portals.component';

const portalRoutes: Routes = [
  {
    path: 'create-portal',
    component: CreatePortalComponent
  },
  {
    path: 'all-portals',
    component: AllPortalsComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(portalRoutes)
  ],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
