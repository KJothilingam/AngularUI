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
        loadComponent :()=>import('./Pages/ADMIN_OG/gallery/gallery.component').then((c)=> c.GalleryComponent),
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
    {
        path: 'modify',
        loadComponent: () => import('./Pages/ADMIN_OG/modify/modify.component').then((c) => c.ModifyComponent)

    },
    {
        path: 'renters',
        loadComponent: () => import('./Pages/ADMIN_OG/user-list/user-list.component').then((c) => c.UserListComponent)

    },
    {
        path: 'user',
        loadComponent: () => import('./Pages/User_OG/user/user.component').then((c) => c.UserComponent)

    },
    {
        path: 'vehiclelist',
        loadComponent: () => import('./Pages/User_OG/vehicle-list/vehicle-list.component').then((c) => c.VehicleListComponent)

    },
    {
        path: 'cart',
        loadComponent: () => import('./Pages/User_OG/cart/cart.component').then((c) => c.CartComponent)

    },
    {
        path: 'orders',
        loadComponent: () => import('./Pages/User_OG/order/order.component').then((c) => c.OrderComponent)

    },
    {
        path: 'usergallery',
        loadComponent: () => import('./Pages/User_OG/user-gallery/user-gallery.component').then((c) => c.UserGalleryComponent)

    },

];