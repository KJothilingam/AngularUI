import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserNavComponent } from '../user-nav/user-nav.component';
import { RentalService } from '../../../service/rental.service';
import { AuthService } from '../../../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule, UserNavComponent,RouterModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orders: any[] = [];
  selectedOrder: any = null;
  showReturnModal: boolean = false;
  returnDetails = { kmsDriven: '', damageLevel: 'NONE', paymentMethod: "" };
  userSecurityDeposit: number = 0;

  constructor( private router: Router,private http: HttpClient, private rentalService: RentalService, private authService: AuthService,private cdr: ChangeDetectorRef) {}

  /** ✅ Load Orders */
  ngOnInit(): void {
    this.loadOrders();
    this.fetchUserSecurityDeposit();
  }

  loadOrders() {
    const userId = this.authService.getUserId(); // Get logged-in user ID
    if (!userId) return; // Ensure user is logged in
  
    this.rentalService.getUserRentalsID(userId).subscribe(data => {
      this.orders = data;
    });
  }
  
  fetchUserSecurityDeposit() {
    const userId = this.authService.getUserId();
    this.rentalService.getUserSecurityDeposit(userId).subscribe((deposit) => {
      this.userSecurityDeposit = deposit; // ✅ Store the fetched deposit
    });
  }


  /** ✅ Open Return Form */
  openReturnForm(order: any) {
    this.selectedOrder = order;
    this.showReturnModal = true;
  }

  

  
    submitReturn() {
      if (!this.selectedOrder) return;

      const { kmsDriven, damageLevel, paymentMethod } = this.returnDetails;

      this.rentalService.returnVehicle(
          this.selectedOrder.id, 
          parseInt(kmsDriven), 
          damageLevel, 
          paymentMethod
      ).subscribe(
          (response: any) => {
              if (response.includes("Insufficient security deposit")) {
                  alert(response); // Show alert if security deposit is not enough
              } else {
                  alert(response);
                  this.orders = this.orders.filter(order => order.id !== this.selectedOrder.id);
                  this.showReturnModal = false;
              }
          },
          (error) => {
              console.error("Error returning vehicle:", error);
              alert(error?.error?.text || "Failed to return vehicle!");
          }
      );
  }


  
      

    extendRental(order: any) {
      this.rentalService.extendRental(order.id).subscribe(
        (response: any) => {
          alert(response);
          this.loadOrders();
          if (!response.includes("limit reached") && !response.includes("Insufficient")) {
            order.extensionCount += 1;
            order.returnDate = new Date(new Date(order.returnDate).getTime() + 86400000);
          }
          this.router.navigate(['/orders']);
          // this.ngOnInit();
        },
        (error) => {
          console.error("Error extending rental:", error);
          alert(error?.error?.text || "Failed to extend rental!");
        }
      );
    }
}
