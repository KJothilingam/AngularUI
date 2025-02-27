import { Injectable, Signal, signal, inject, Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  phoneNo = signal('');
  userName = signal('');
  securityDeposit = signal(0);
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService); // Inject AuthService

  updateEmail(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.email.set(inputElement.value);
  }

  updatePassword(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.password.set(inputElement.value);
  }

  updateName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.userName.set(inputElement.value);
  }

  updatePhoneNo(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.phoneNo.set(inputElement.value);
  }

  updateSecurityDeposit(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.securityDeposit.set(Number(inputElement.value));
  }

  login(): void {
    console.log("Email:", this.email());
    console.log("Password:", this.password());

    if (!this.email() || !this.password()) {
      alert("Please enter email and password!");
      return;
    }

    this.http.post<{ authenticated: boolean, role: string }>('http://localhost:8080/login', null, {
      params: { email: this.email(), password: this.password() }
    }).subscribe(response => {
      if (response.authenticated) {
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'RENTER') {
          this.router.navigate(['/user']);
        } 
      } else {
        alert("Invalid email or password!");
      }
    }, error => {
      alert("Login failed. Please try again.");
      console.error(error);
    });
  }

  register(): void {
    if (!this.email() || !this.password() || !this.userName() || !this.phoneNo()) {
      alert("Please fill all required fields!");
      return;
    }
  
    const userData = {
      email: this.email(),
      password: this.password(),
      phoneNo: this.phoneNo(),
      role: 'RENTER', // Default Role
      securityDeposit: 0, // Default value set to 0
      userName: this.userName()
    };
  
    console.log("Sending data to backend:", userData); // Debugging log
  
    this.http.post<{ message: string }>('http://localhost:8080/register', userData).subscribe(
      response => {
        // this.router.navigate(['/admin']);
        alert(response.message); // Show success message
      },
      error => {
        console.error("Backend Error:", error);
        alert("Registration failed. Try again.");
      }
    );
    
  }
  
  
  

  @ViewChild('container') container!: ElementRef;
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
}
