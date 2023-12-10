import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

    // Application Routes
    {
        path: 'home',
        component: HomeComponent,
        title: 'ALUmni Homepage'
    },
    {
        path: 'login',
        loadComponent: () => import('./components/pages/login/login.component').then( c => c.LoginComponent),
        title: 'Alumni Login'
    },
    {
        path: 'register',
        loadComponent: () => import('./components/pages/signup/signup.component').then( c => c.SignupComponent),
        title: 'Alumni Registration'
    },
    {
        path: 'events',
        loadComponent: () => import('./components/pages/events/events.component').then( c => c.EventsComponent),
        canActivate : [authGuard],
        title: 'All Events'
    },
    {
        path: ':alumniId/events',
        loadComponent: () => import('./components/pages/alum-events/alum-events.component').then( c => c.AlumEventsComponent),
        title: 'Alumni Events'
    },
    {
        path: 'connect',
        loadComponent: () => import('./components/pages/connect/connect.component').then( c => c.ConnectComponent),
        title: 'Connect With Others '
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/pages/dashboard/dashboard.component').then( c => c.DashboardComponent),
        title: 'ALUmni Dashboard'
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
