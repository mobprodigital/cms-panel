import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePortalComponent } from './components/create-portal/create-portal.component';
import { AllPortalsComponent } from './components/all-portals/all-portals.component';
import { PortalRoutingModule } from './portal-routing/portal-routing.module';
import { MatCardModule, MatTableModule, MatInputModule, MatSelectModule, MatButtonModule, MatListModule, MatExpansionModule, MatIconModule, MatPaginatorModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { AjaxService } from 'src/app/services/ajax/ajax.service';
import { UserAccountService } from 'src/app/services/user-account/user-account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatSortModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CreatePortalComponent, AllPortalsComponent],
  exports: [PortalRoutingModule, MatCardModule],
  providers: [AjaxService, UserAccountService]
})
export class PortalsModule { }
