import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Vehicle } from '../../../Interface/vehicle.component';
import { VehicleService } from '../../../service/vehicle.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modify',
  imports: [ CommonModule, NavBarComponent],
  standalone:true,
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.css'
})
export class ModifyComponent {
  vehicles: Vehicle[] = [];
  
  constructor(private vehicleService: VehicleService, private http: HttpClient) {} ;// ✅ Inject HttpClient

    // constructor(private vehicleService: VehicleService) {}
  
    ngOnInit(): void {
      this.getAllVehicles();
    }
  
    getAllVehicles() {
      this.vehicleService.getVehicles().subscribe((data) => {
        this.vehicles = data;
      });
    }

    deleteVehicle(vehicleId: number) {
      this.http.delete(`http://localhost:8080/vehicles/${vehicleId}`, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log("Response from server:", response);
          alert(response);  // Now it will correctly show "Vehicle deleted successfully"
          
          // Remove deleted vehicle from UI
          this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleId);
        },
        error: (error) => {
          console.error("Error deleting vehicle:", error);
          alert("Failed to delete vehicle. Check console for details.");
        }
      });
    }

    updateVehicle(vehicle: Vehicle) {
  const updatedVehicle = { ...vehicle, rentalPrice: prompt("Enter new rental price:", vehicle.rentalPrice.toString()) };

  if (updatedVehicle.rentalPrice !== null) {
    this.http.put(`http://localhost:8080/vehicles/${vehicle.id}`, updatedVehicle).subscribe({
      next: (response) => {
        alert("Vehicle updated successfully!");
        this.getAllVehicles(); // Refresh data after update
      },
      error: (error) => {
        console.error("Error updating vehicle:", error);
        alert("Failed to update vehicle.");
      }
    });
  }
}

    
}
