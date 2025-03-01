import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  userId: number;
  userName: string;
  phoneNo: string;
  securityDeposit: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = 'http://localhost:8080/api/users';
  private apiUrl = 'http://localhost:8080/'; // Updated to match backend


  constructor(private http: HttpClient) {}

  getRenters(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/renters`);
  }

  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
