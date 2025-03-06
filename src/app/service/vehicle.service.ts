import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../Interface/vehicle.component';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:8080/vehicles/list'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all vehicles
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }
  
  deleteVehicle(vehicleId: number) {
    return this.http.delete(`http://localhost:8080/vehicles/${vehicleId}`);
  }

  getVehicleById(vehicleId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`/api/vehicles/${vehicleId}`);
  }
  

  // // Fetch a single vehicle by ID
  // getVehicleById(id: number): Observable<Vehicle> {
  //   return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  // }

  // // Add a new vehicle
  // addVehicle(vehicle: Vehicle): Observable<Vehicle> {
  //   return this.http.post<Vehicle>(this.apiUrl, vehicle);
  // }

  // // Update a vehicle
  // updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
  //   return this.http.put<Vehicle>(`${this.apiUrl}/${vehicle.id}`, vehicle);
  // }

  // // Delete a vehicle
  // deleteVehicle(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}