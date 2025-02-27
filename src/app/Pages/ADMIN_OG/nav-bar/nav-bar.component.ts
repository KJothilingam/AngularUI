import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  // constructor(private authService: AuthService) {}

  // // Getter function to return the signal value properly
  // get isLoggedIn() {
  //   return this.authService.isLoggedIn(); // ✅ Call the signal
  // }

  // logout() {
  //   this.authService.logout();
  // }
}
