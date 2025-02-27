import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AddVehicleComponent } from "../add-vehicle/add-vehicle.component";
import { HomeComponent } from "../../../Main_App/home/home.component";
import { HeaderComponent } from "../../../header/header.component";
import { FooterComponent } from "../../../Main_App/footer/footer.component";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { GalleryComponent } from "../../../Main_App/gallery/gallery.component";
import { VehicleComponent } from "../../../Main_App/vehicle/vehicle.component";
import { AboutComponent } from "../../../Main_App/about/about.component";


@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,
    AddVehicleComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent, NavBarComponent, RouterModule, GalleryComponent, VehicleComponent, AboutComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
