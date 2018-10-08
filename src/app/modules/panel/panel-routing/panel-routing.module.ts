import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from '../components/panel/panel.component';
import { } from '../modules/video/video.module'

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
