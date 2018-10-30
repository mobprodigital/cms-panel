import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: '../modules/login/login.module#LoginModule',
    },
    {
        path: 'panel',
        canActivate : [AuthGuard],
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
