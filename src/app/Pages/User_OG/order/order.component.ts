import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserNavComponent } from '../user-nav/user-nav.component';
import { RentalService } from '../../../service/rental.service';
import { AuthService } from '../../../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, UserNavComponent],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orders: any[] = [];
  selectedOrder: any = null;
  showReturnModal: boolean = false;
  returnDetails = { kmsDriven: '', damageLevel: 'NONE', paidByCash: true };

  constructor( private router: Router,private http: HttpClient, private rentalService: RentalService, private authService: AuthService,private cdr: ChangeDetectorRef) {}

  /** ✅ Load Orders */
  ngOnInit(): void {
    this.loadOrders();
  }

  // loadOrders() {
  //   this.http.get<any[]>('http://localhost:8080/orders').subscribe(data => {
  //     this.orders = data;
  //   });
  // }
  loadOrders() {
    const userId = this.authService.getUserId(); // Get logged-in user ID
    if (!userId) return; // Ensure user is logged in
  
    this.rentalService.getUserRentalsID(userId).subscribe(data => {
      this.orders = data;
    });
  }
  

  /** ✅ Open Return Form */
  openReturnForm(order: any) {
    this.selectedOrder = order;
    this.showReturnModal = true;
  }

  /** ✅ Submit Vehicle Return */
//   submitReturn() {
//     if (!this.selectedOrder) return;

//     const { kmsDriven, damageLevel, paidByCash } = this.returnDetails;
    
//     this.rentalService.returnVehicle(
//       this.selectedOrder.id, parseInt(kmsDriven), damageLevel, paidByCash
//     ).subscribe(
//       (response: any) => {
//         alert(response); 
//         this.selectedOrder.isReturned = true;
//         this.showReturnModal = false; 
//       },
//       (error) => {
//         console.error("Error returning vehicle:", error);
//         alert(error?.error?.text || "Failed to return vehicle!");
//       }
//     );
// }
// submitReturn() {
//   if (!this.selectedOrder) return;

//   const { kmsDriven, damageLevel, paidByCash } = this.returnDetails;

//   this.rentalService.returnVehicle(
//     this.selectedOrder.id, parseInt(kmsDriven), damageLevel, paidByCash
//   ).subscribe(
//     (response: any) => {
//       alert(response);

//       // ✅ Update the order as returned with a new reference
//       this.selectedOrder.isReturned = true;
//       this.selectedOrder = Object.assign({}, this.selectedOrder); // Create new object reference

//       // ✅ Hide modal after return
//       this.showReturnModal = false;

//       // ✅ Force UI refresh
//       this.cdr.detectChanges();
//     },
//     (error) => {
//       console.error("Error returning vehicle:", error);
//       alert(error?.error?.text || "Failed to return vehicle!");
//     }
//   );
// }
submitReturn() {
  if (!this.selectedOrder) return;

  const { kmsDriven, damageLevel, paidByCash } = this.returnDetails;

  this.rentalService.returnVehicle(
    this.selectedOrder.id, parseInt(kmsDriven), damageLevel, paidByCash
  ).subscribe(
    (response: any) => {
      alert(response);

      // ✅ Update the returned order in the array
      this.orders = this.orders.map(order => 
        order.id === this.selectedOrder.id ? { ...order, isReturned: true } : order
      );

      this.showReturnModal = false;
      this.cdr.detectChanges(); // ✅ Force UI update

      // ✅ Redirect properly using Angular Router
      this.router.navigate(['/orders']);
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
        if (!response.includes("limit reached") && !response.includes("Insufficient")) {
          order.extensionCount += 1;
          order.returnDate = new Date(new Date(order.returnDate).getTime() + 86400000);
        }
      },
      (error) => {
        console.error("Error extending rental:", error);
        alert(error?.error?.text || "Failed to extend rental!");
      }
    );
  }
}
