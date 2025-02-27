import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: WritableSignal<boolean> = signal(false);
  private userRole: WritableSignal<string> = signal('');

  setLoginStatus(status: boolean, role: string) {
    this.loggedIn.set(status);
    this.userRole.set(role);
  
    console.log("AuthService: Login Status ->", this.loggedIn());
    console.log("AuthService: User Role ->", this.userRole());
  }
  

  isLoggedIn(): boolean {
    return this.loggedIn(); // ✅ Call the signal to get value
  }

  getUserRole(): string {
    return this.userRole(); // ✅ Call the signal to get value
  }

  logout() {
    this.loggedIn.set(false);
    this.userRole.set('');
  }
}
