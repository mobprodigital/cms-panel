import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: '../modules/login/login.module#LoginModule',
    },
    {
        path: 'panel',
        loadChildren: '../modules/panel/panel.module#PanelModule',
    },
    {
        path : '',
        component : NotFoundComponent
    },
    {
        path : '**',
        component : NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
