import { Injectable, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: WritableSignal<boolean>;
  private userRole: WritableSignal<string>;
  private userName: WritableSignal<string>;
  private userId: WritableSignal<number>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Ensure signals are initialized with default values
    this.loggedIn = signal(this.getStoredLoginStatus());
    this.userRole = signal(this.getStoredUserRole());
    this.userName = signal(this.getStoredUserName());
    this.userId = signal(this.getStoredUserId());
  }

  setLoginStatus(status: boolean, role: string, name: string, id: number) { 
    this.loggedIn.set(status);
    this.userRole.set(role);
    this.userName.set(name);
    this.userId.set(id);

    // ✅ Store in LocalStorage only if in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loggedIn', JSON.stringify(status));
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', name);
      localStorage.setItem('userId', JSON.stringify(id));
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  getUserRole(): string {
    return this.userRole();
  }

  getUserName(): string {
    return this.userName();
  }

  getUserId(): number {
    return this.userId();
  }

  logout() {
    this.loggedIn.set(false);
    this.userRole.set('');
    this.userName.set('');
    this.userId.set(0);

    // ✅ Clear LocalStorage only if in the browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
    }
  }

  // ✅ Retrieve values from localStorage safely
  private getStoredLoginStatus(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('loggedIn') || 'false');
    }
    return false;
  }

  private getStoredUserRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole') || '';
    }
    return '';
  }

  private getStoredUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userName') || '';
    }
    return '';
  }

  private getStoredUserId(): number {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('userId') || '0');
    }
    return 0;
  }
}
