import { Component } from '@angular/core';
import { Vehicle } from '../../Interface/vehicle.component';
import { VehicleService } from '../../service/vehicle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  imports: [CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
    });
  }
}



