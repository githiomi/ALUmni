import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [

    // Application Routes
    {
        path: 'home',
        component: HomeComponent,
        title: 'ALUmni Homepage'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./components/pages/error/error.component').then( c => c.ErrorComponent ),
        title: '404 Error'
    }
];
