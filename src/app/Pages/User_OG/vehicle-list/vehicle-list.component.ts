import { Component } from '@angular/core';
import { VehicleService } from '../../../service/vehicle.service';
import { Vehicle } from '../../../Interface/vehicle.component';
import { AuthService } from '../../../service/auth.service'; 
import { CommonModule } from '@angular/common';
import { CartService } from '../../../service/cart-service.service';
import { UserNavComponent } from "../user-nav/user-nav.component";

@Component({
  selector: 'app-vehicle-list',
  imports: [CommonModule, UserNavComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [];
  userName: string = '';

  constructor(
    private vehicleService: VehicleService,
    private authService: AuthService, 
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    this.getAllVehicles();
    this.userName = this.authService.getUserName(); 
  }

  // getAllVehicles() {
  //   this.vehicleService.getVehicles().subscribe((data) => {
  //     this.vehicles = data;
  //   });
  // }
  getAllVehicles() {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data.sort((a, b) => b.id - a.id); 
    });
  }
  

  // ✅ Add Vehicle to Cart (Fully Fixed)
  addToCart(vehicle: Vehicle) {
    if (!this.authService.isLoggedIn()) {
      alert('Please log in to add items to your cart.');
      return;
    }
  
    const userId = this.authService.getUserId(); 
  
    if (!userId || userId === 0) {
      alert('User ID not found. Please log in again.');
      return;
    }
  
    this.cartService.addToCart(userId, vehicle.id).subscribe(
      (response: any) => {
        console.log('✅ Success Response:', response);
        alert('✅ Vehicle added to cart successfully!');
      },
      (error) => {
        console.error('❌ Error adding to cart:', error);
        alert('❌ Failed to add to cart. Please try again.');
      }
    );
  }
  
  
  
}  
