import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart-service.service';
import { AuthService } from '../../../service/auth.service';
import { Vehicle } from '../../../Interface/vehicle.component';
import { CommonModule } from '@angular/common';
import { UserNavComponent } from "../user-nav/user-nav.component";

@Component({
  selector: 'app-cart',
  imports: [CommonModule, UserNavComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  vehicles: Vehicle[] = [];
  userName: string = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadUserCart();
    this.userName = this.authService.getUserName();
  }

  loadUserCart() {
    const userId = this.authService.getUserId();

    if (!userId) {
      alert('Please log in to view your cart.');
      return;
    }

    this.cartService.getCartItems(userId).subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data;
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

    removeFromCart(vehicleId: number) {
      const userId = this.authService.getUserId();
      if (!userId) {
        alert('Please log in to remove items from your cart.');
        return;
      }

      console.log("Removing vehicle with ID:", vehicleId, "for user:", userId); // Debug log

      this.cartService.removeFromCart(userId, vehicleId).subscribe(
        (response: string) => {
          console.log("Response from backend:", response);
          this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
          alert(response);
        },
        (error) => {
          console.error('Error removing vehicle:', error);
          alert('An error occurred while removing the vehicle from your cart.');
        }
      );
    }


}
