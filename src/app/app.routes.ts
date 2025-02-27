import { CanActivateFn, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';

// const authGuard: CanActivateFn = () => {
//     const authService = inject(AuthService);
//     return authService.isLoggedIn();
//   };

export const routes: Routes = [
    // {path :'' , component : HomeComponent},

    {
        path:'home',
        loadComponent :()=>import('./Main_App/home/home.component').then((c)=> c.HomeComponent),
    },
    {
        path:'about',
        loadComponent :()=>import('./Main_App/about/about.component').then((c)=> c.AboutComponent),
    },
    {
        path:'vehicle',
        loadComponent :()=>import('./Main_App/vehicle/vehicle.component').then((c)=> c.VehicleComponent),
    },
    {
        path:'gallery',
        loadComponent :()=>import('./Main_App/gallery/gallery.component').then((c)=> c.GalleryComponent),
    },
    {
        path:'',
        loadComponent :()=>import('./Pages/login/login.component').then((c)=> c.LoginComponent),
    },
    {
        path: 'addVehicle',
        loadComponent: () => import('./Pages/ADMIN_OG/add-vehicle/add-vehicle.component').then((c) => c.AddVehicleComponent)
       
    },
    {
        path: 'admin',
        loadComponent: () => import('./Pages/ADMIN_OG/admin/admin.component').then((c) => c.AdminComponent)
        
    },
    {
        path: 'rental',
        loadComponent: () => import('./Pages/ADMIN_OG/rental/rental.component').then((c) => c.RentalComponent)
    
    },

];