import { CanActivateFn, Routes } from '@angular/router';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';
import { access } from 'fs';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

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
        loadComponent :()=>import('./Pages/ADMIN_OG/gallery/gallery.component').then((c)=> c.GalleryComponent),
    },
    //common
    

    { path: '', loadComponent: () => import('./Pages/login/login.component').then(m => m.LoginComponent) },

    // Admin Routes
    { 
      path: 'admin', 
      loadComponent: () => import('./Pages/ADMIN_OG/admin/admin.component').then(m => m.AdminComponent),
      canActivate: [AuthGuard], 
      data: { role: 'ADMIN' } 
    },
    { 
      path: 'addVehicle', 
      loadComponent: () => import('./Pages/ADMIN_OG/add-vehicle/add-vehicle.component').then(m => m.AddVehicleComponent),
      canActivate: [AuthGuard], 
      data: { role: 'ADMIN' } 
    },
    {
        path: 'rental',
        loadComponent: () => import('./Pages/ADMIN_OG/rental/rental.component').then((c) => c.RentalComponent),
        canActivate: [AuthGuard], 
        data: { role: 'ADMIN' } 
    
    },
    {
        path: 'modify',
        loadComponent: () => import('./Pages/ADMIN_OG/modify/modify.component').then((c) => c.ModifyComponent),
        canActivate: [AuthGuard], 
        data: { role: 'ADMIN' } 

    },
    {
        path: 'renters',
        loadComponent: () => import('./Pages/ADMIN_OG/user-list/user-list.component').then((c) => c.UserListComponent),
        canActivate: [AuthGuard], 
        data: { role: 'ADMIN' } 

    },

    
    // User Routes
    { 
      path: 'user', 
      loadComponent: () => import('./Pages/User_OG/user/user.component').then(m => m.UserComponent),
      canActivate: [AuthGuard], 
      data: { role: 'RENTER' } 
    },
    { 
      path: 'cart', 
      loadComponent: () => import('./Pages/User_OG/cart/cart.component').then(m => m.CartComponent),
      canActivate: [AuthGuard], 
      data: { role: 'RENTER' } 
    },
    {
            path: 'vehiclelist',
            loadComponent: () => import('./Pages/User_OG/vehicle-list/vehicle-list.component').then((c) => c.VehicleListComponent)
            , canActivate: [AuthGuard], 
            data: { role: 'RENTER' } 
    
        },
        {
            path: 'orders',
            loadComponent: () => import('./Pages/User_OG/order/order.component').then((c) => c.OrderComponent),
            canActivate: [AuthGuard], 
            data: { role: 'RENTER' } 
    
        },
        {
            path: 'usergallery',
            loadComponent: () => import('./Pages/User_OG/user-gallery/user-gallery.component').then((c) => c.UserGalleryComponent),
            canActivate: [AuthGuard], 
            data: { role: 'RENTER' } 
    
        },
        {
            path: 'profile',
            loadComponent: () => import('./Pages/User_OG/profile/profile.component').then((c) => c.ProfileComponent),
            canActivate: [AuthGuard], 
            data: { role: 'RENTER' } 
    
        },
    
    // Redirect unknown routes
    { path: '**', redirectTo: '' }

];