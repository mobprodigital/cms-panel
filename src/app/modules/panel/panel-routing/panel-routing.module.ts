import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from '../components/panel/panel.component';


const panelRoutes: Routes = [
  {
    path: "",
    component: PanelComponent,
    children: [

      {
        path: 'video',
        loadChildren: '../modules/video/video.module#VideoModule'
      },
      {
        path: 'user-account',
        loadChildren: '../modules/user-account/user-account.module#UserAccountModule'
      },
      {
        path: 'portal',
        loadChildren: '../modules/portals/portals.module#PortalsModule'
      }

    ]
  },
  {
    path: "**",
    component: PanelComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(panelRoutes)
  ],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
