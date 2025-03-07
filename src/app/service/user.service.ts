import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Interface/user.component';



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
  
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}id/${userId}`);
  }
  
  
  //admin
  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser);
  }
  
  
  //user
  updateUserProfile(userId: number, updatedUser: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}profile/${userId}`, updatedUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }


 
}