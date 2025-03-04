import { Component, computed } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  userRole = computed(() => this.authService.getUserRole());

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    console.log("Current Role:", this.authService.getUserRole()); 
    console.log("Is Logged In:", this.authService.isLoggedIn());
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }
}
