import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../Interface/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl = 'http://localhost:8080/rentals'; // Update with your actual backend URL
  private baseUrl2 = 'http://localhost:8080/orders'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  // extendRental(rentalId: number): Observable<string> {
  //   let params = new HttpParams().set('rentalId', rentalId.toString());
  //   return this.http.post<string>(`${this.baseUrl}/extend`, null, { params });
  // }

  extendRental(rentalId: number): Observable<any> {
    let params = new HttpParams().set('rentalId', rentalId.toString());
    return this.http.post<Rental>(`${this.baseUrl}/extend`, null, { params });
  }
  

  returnVehicle(orderId: number, kmsDriven: number, damageLevel: string, paymentMethod: string) {
    let params = new HttpParams()
      .set('kmsDriven', kmsDriven.toString())
      .set('damageLevel', damageLevel)
      .set('paymentMethod', paymentMethod);
  
    return this.http.put(`${this.baseUrl}/return/${orderId}`, null, { params });
  }

  getUserSecurityDeposit(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl2}/user/security-deposit/${userId}`);
  }
  
  

  
  getAllRentals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
  
  getUserRentalsID(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl2}/user/${userId}`);
  }

  getUserHistory(userId: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl2}/history/${userId}`);
  }
 
  
  
}
