import { Component } from '@angular/core';
import { AddVehicleComponent } from "../add-vehicle/add-vehicle.component";
import { HomeComponent } from "../home/home.component";
import { HeaderComponent } from "../../Main_App/header/header.component";

@Component({
  selector: 'app-admin',
  imports: [AddVehicleComponent, HomeComponent, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
