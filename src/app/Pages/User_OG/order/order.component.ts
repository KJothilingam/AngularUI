import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserNavComponent } from "../user-nav/user-nav.component";

@Component({
  selector: 'app-order',
  imports: [CommonModule, UserNavComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/orders').subscribe(data => {
      this.orders = data;
    });
  }

}
