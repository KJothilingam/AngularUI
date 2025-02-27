import { Component, ElementRef, ViewChild, AfterViewInit, Signal, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;

  // Using Angular Signals for state management
  email = signal('');
  password = signal('');

  private http = inject(HttpClient);
  private router = inject(Router);

  ngAfterViewInit(): void {
    if (!this.container) {
      console.error("Container element not found!");
    }
  }

  toggleForm(isSignUp: boolean): void {
    if (this.container) {
      if (isSignUp) {
        this.container.nativeElement.classList.add('active');
      } else {
        this.container.nativeElement.classList.remove('active');
      }
    } else {
      console.error("Container is undefined");
    }
  }

  updateEmail(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.email.set(inputElement.value);
  }

  updatePassword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password.set(inputElement.value);
  }

  login(): void {
    if (!this.email() || !this.password()) {
      alert("Please enter email and password!");
      return;
    }

    this.http.post<{ authenticated: boolean, role: string }>('http://localhost:8080/login', null, {
      params: { email: this.email(), password: this.password() }
    }).subscribe(response => {
      if (response.authenticated) {
        alert("Login successful! Role: " + response.role);

        // Redirect based on role
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'RENTER') {
          this.router.navigate(['/renter-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      } else {
        alert("Invalid email or password!");
      }
    }, error => {
      alert("Login failed. Please try again.");
      console.error(error);
    });
  }
}
