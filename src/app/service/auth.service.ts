import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: WritableSignal<boolean> = signal(false);
  private userRole: WritableSignal<string> = signal('');
  private userName = signal('');
  private userId: WritableSignal<number> = signal(0); // ✅ New userId signal

  setLoginStatus(status: boolean, role: string, name: string, id: number) { 
    this.loggedIn.set(status);
    this.userRole.set(role);
    this.userName.set(name);
    this.userId.set(id); // ✅ Store userId
  }

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  getUserRole(): string {
    return this.userRole();
  }

  getUserName() {
    return this.userName();
  }

  getUserId(): number { // ✅ New method to get userId
    return this.userId();
  }

  logout() {
    this.loggedIn.set(false);
    this.userRole.set('');
    this.userName.set('');
    this.userId.set(0);
  }
}
