import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePortalComponent } from './components/create-portal/create-portal.component';
import { AllPortalsComponent } from './components/all-portals/all-portals.component';
import { PortalRoutingModule } from './portal-routing/portal-routing.module';
import { MatCardModule, MatTableModule, MatInputModule, MatSelectModule, MatButtonModule, MatListModule, MatExpansionModule, MatIconModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [CreatePortalComponent, AllPortalsComponent],
  exports: [PortalRoutingModule, MatCardModule]
})
export class PortalsModule { }
