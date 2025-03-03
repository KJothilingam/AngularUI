import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../Interface/vehicle.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}

  addToCart(userId: number, vehicleId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('vehicleId', vehicleId.toString());
    return this.http.post(`${this.baseUrl}/add`, {}, { params, responseType: 'text' });
  }

  // private baseUrl2 = 'http://localhost:8080/cart';

  // constructor(private http: HttpClient) {}

  getCartItems(userId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/user/${userId}`);
  }

 // cart-service.service.ts
removeFromCart(userId: number, vehicleId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/remove?userId=${userId}&vehicleId=${vehicleId}`, { responseType: 'text' });
}


}
