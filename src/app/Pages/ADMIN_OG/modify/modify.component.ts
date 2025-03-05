import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Vehicle } from '../../../Interface/vehicle.component';
import { VehicleService } from '../../../service/vehicle.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule for ngModel
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modify',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, MatSnackBarModule,RouterLink], // ✅ Import FormsModule
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.css'
})
export class ModifyComponent {
  vehicles: Vehicle[] = [];
  showUpdateForm: boolean = false;
  selectedVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService, private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
    });
  }

  showNotification(message: string, type: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }

  // deleteVehicle(vehicleId: number) {
  //   this.http.delete(`http://localhost:8080/vehicles/${vehicleId}`, { responseType: 'text' }).subscribe({
  //     next: () => {
  //       this.showNotification("Vehicle deleted successfully", 'success');
  //       this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleId);
  //     },
  //     error: () => {
  //       this.showNotification("Failed to delete vehicle", 'error');
  //     }
  //   });
  // }
  
  deleteVehicle(vehicleId: number) {
  if (confirm("Are you sure you want to delete this vehicle?")) { 
    this.http.delete(`http://localhost:8080/vehicles/${vehicleId}`, { responseType: 'text' }).subscribe({
      next: () => {
        alert("Vehicle deleted successfully!");
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleId);
      },
      error: (err) => {
        alert(err.error || "Failed to delete vehicle! It may have active rentals.");
      }
    });
  }
}


  editVehicle(vehicle: Vehicle) {
    this.selectedVehicle = { ...vehicle }; 
    this.showUpdateForm = true;
  }

  updateVehicle() {
    if (!this.selectedVehicle) return;

    this.http.put(`http://localhost:8080/vehicles/${this.selectedVehicle.id}`, this.selectedVehicle).subscribe({
      next: () => {
        this.showNotification("Vehicle updated successfully!", 'success');
        this.getAllVehicles(); 
        this.cancelUpdate();
      },
      error: () => {
        this.showNotification("Failed to update vehicle.", 'error');
      }
    });
  }

  cancelUpdate() {
    this.showUpdateForm = false;
    this.selectedVehicle = null;
  }

  
}
