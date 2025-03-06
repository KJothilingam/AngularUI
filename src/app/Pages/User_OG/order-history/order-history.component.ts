import { Component } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RentalService } from '../../../service/rental.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule,UserNavComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  
  orders: any[] = [];
  constructor( private router: Router,private http: HttpClient, private rentalService: RentalService, private authService: AuthService) {}

  /** ✅ Load Orders */
  ngOnInit(): void {
    this.OrderHistory();
  }

  OrderHistory() {
    const userId = this.authService.getUserId(); // Get logged-in user ID
    if (!userId) return; // Ensure user is logged in
  
    this.rentalService.getUserHistory(userId).subscribe(data => {
      this.orders = data;
    });
    console.log(this.orders);

  }

}
  // selectedOrder: any = null;
  // showReturnModal: boolean = false;
  // returnDetails = { kmsDriven: '', damageLevel: 'NONE', paidByCash: true };

  

 
  