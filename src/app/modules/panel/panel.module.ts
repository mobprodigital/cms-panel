import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { PanelRoutingModule } from './panel-routing/panel-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PanelRoutingModule
  ],
  declarations: [PanelComponent],
  exports : [PanelRoutingModule]
})
export class PanelModule { }
