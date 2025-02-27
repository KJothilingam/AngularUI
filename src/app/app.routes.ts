import { CanActivateFn, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    return authService.isLoggedIn();
  };

export const routes: Routes = [
    // {path :'' , component : HomeComponent},

    {
        path:'home',
        loadComponent :()=>import('./Pages/home/home.component').then((c)=> c.HomeComponent),
    },
    {
        path:'about',
        loadComponent :()=>import('./Pages/about/about.component').then((c)=> c.AboutComponent),
    },
    {
        path:'vehicle',
        loadComponent :()=>import('./Pages/vehicle/vehicle.component').then((c)=> c.VehicleComponent),
    },
    {
        path:'gallery',
        loadComponent :()=>import('./Pages/gallery/gallery.component').then((c)=> c.GalleryComponent),
    },
    {
        path:'',
        loadComponent :()=>import('./Main_App/login/login.component').then((c)=> c.LoginComponent),
    },
    // {
    //     path:'user',
    //     loadComponent :()=>import('./Pages/user/user.component').then((c)=> c.UserComponent),
    // },
    // {
    //     path:'admin',
    //     loadComponent :()=>import('./Pages/admin/admin.component').then((c)=> c.AdminComponent),
    // },
    
    // { path: '', component: LoginComponent },
    // { path: 'home', component: HomeComponent },
    {
        path: 'admin',
        loadComponent: () => import('./Pages/admin/admin.component').then((c) => c.AdminComponent)
        // ,canActivate: [authGuard],
    },
    {
        path: 'user',
        loadComponent: () => import('./Pages/user/user.component').then((c) => c.UserComponent)
        // ,canActivate: [authGuard],
    },

];