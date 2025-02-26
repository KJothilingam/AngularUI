import { Component } from '@angular/core';
import { AddVehicleComponent } from "../add-vehicle/add-vehicle.component";

@Component({
  selector: 'app-admin',
  imports: [AddVehicleComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
