import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = signal(false);
  private userRole = signal('');

  setLoginStatus(status: boolean, role: string) {
    this.loggedIn.set(status);
    this.userRole.set(role);
  }

  isLoggedIn() {
    return this.loggedIn();
  }

  getUserRole() {
    return this.userRole();
  }
}
