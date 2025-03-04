import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
// import { UserService } from '../../../service/user.service';
import { User } from '../../../Interface/user.component';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { UserNavComponent } from "../user-nav/user-nav.component";
// import { User } from '../../../Interface/user'; // ✅ Correct Import

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, UserNavComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // ✅ Use User interface correctly

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Get userId from AuthService
    console.log('Fetched User ID:', userId); // 🔴 Debug: Check if userId is coming
  
    if (userId > 0) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          console.log('User Data:', data); // 🔴 Debug: Check fetched user data
          this.user = data;
        },
        (error) => {
          console.error('Error Fetching User:', error); // 🔴 Debug: Log any errors
        }
      );
    }
  }
  
}
