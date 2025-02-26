import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
    // {path :'' , component : HomeComponent},

    {
        path:'',
        loadComponent :()=>import('./Pages/home/home.component').then((c)=> c.HomeComponent),
    },
    {
        path:'about',
        loadComponent :()=>import('./Pages/about/about.component').then((c)=> c.AboutComponent),
    },
    {
        path:'admin',
        loadComponent :()=>import('./Pages/admin/admin.component').then((c)=> c.AdminComponent),
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
        path:'login',
        loadComponent :()=>import('./Main_App/login/login.component').then((c)=> c.LoginComponent),
    },

];