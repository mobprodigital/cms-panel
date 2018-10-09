import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { PanelRoutingModule } from './panel-routing/panel-routing.module';

import {
  MatExpansionModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    PanelRoutingModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  declarations: [PanelComponent],
})
export class PanelModule { }
