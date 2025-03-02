import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/cart/add';

  constructor(private http: HttpClient) {}

  addToCart(userId: number, vehicleId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('vehicleId', vehicleId.toString());

    return this.http.post(this.apiUrl, {}, { params, responseType: 'text' }); // ✅ Force text response
  }
}
