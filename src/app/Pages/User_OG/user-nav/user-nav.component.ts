import { Component, computed } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  imports: [RouterLink],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  userRole = computed(() => this.authService.getUserRole());

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    console.log("Current Role:", this.authService.getUserRole()); 
    console.log("Is Logged In:", this.authService.isLoggedIn());
    this.authService.logout(); // ✅ Clear login state
    this.router.navigate(['/']); // ✅ Redirect to login page
  }
}


