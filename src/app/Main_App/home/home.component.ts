import { Component } from '@angular/core';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { AboutComponent } from '../about/about.component';
import { GalleryComponent } from '../../Pages/ADMIN_OG/gallery/gallery.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterLink,VehicleComponent, AboutComponent,GalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

}
