import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private baseUrl = 'http://localhost:8080/rentals'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  extendRental(rentalId: number): Observable<string> {
    let params = new HttpParams().set('rentalId', rentalId.toString());
    return this.http.post<string>(`${this.baseUrl}/extend`, null, { params });
  }
  returnVehicle(rentalId: number, kmsDriven: number, damageLevel: string, paidByCash: boolean): Observable<string> {
    let params = new HttpParams()
      .set('kmsDriven', kmsDriven.toString())
      .set('damageLevel', damageLevel)
      .set('paidByCash', paidByCash.toString());
  
    return this.http.put<string>(`http://localhost:8080/rentals/return/${rentalId}`, null, { params });
  }
  
  
}
