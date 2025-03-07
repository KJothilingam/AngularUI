import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserNavComponent } from '../user-nav/user-nav.component';
import { RentalService } from '../../../service/rental.service';
import { AuthService } from '../../../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Rental } from '../../../Interface/rental';

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

    
      ngOnInit(): void {
        this.loadOrders();
        this.fetchUserSecurityDeposit();
      }

      loadOrders() {
        const userId = this.authService.getUserId(); 
        if (!userId) return; 
      
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
              if (response?.rental) {
                  alert(response.message);  
                  this.orders = this.orders.filter(order => order.id !== response.rental.id);
  
                  this.showReturnModal = false;
                  this.selectedOrder = null;
                  this.cdr.detectChanges();
              }
          },
          (error) => {
              console.error("Error returning vehicle:", error);
              const errorMsg = error?.error?.error || "❌ Failed to return vehicle! Please try again.";
              alert(errorMsg); 
          }
      );
  }
  

    extendRental(order: any) {
      this.rentalService.extendRental(order.id).subscribe(
        (updatedRental) => {
          alert("Rental extended successfully!");
          console.log("Updated Rental:", updatedRental);
    
          
          order.extensionCount = updatedRental.extensionCount;
          order.returnDate = updatedRental.returnDate;
          order.user.securityDeposit = updatedRental.borrower.securityDeposit; 
    
          this.showReturnModal = false;
          this.selectedOrder = null;
          this.cdr.detectChanges(); 
        },
        (error) => {
          console.error("Error extending rental:", error);
          alert(error?.error?.message || "Failed to extend rental!");
        }
      );
    }
    
}
