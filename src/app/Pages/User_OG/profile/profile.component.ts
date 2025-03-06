import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../Interface/user.component';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, UserNavComponent , FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isEditing: boolean = false;
  updatedUser: Partial<User> = {}; 

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log('Fetched User ID:', userId); 

    if (userId > 0) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          console.log('User Data:', data); 
          this.user = data;
        },
        (error) => {
          console.error('Error Fetching User:', error); 
        }
      );
    }
  }

  toggleEdit() {
    this.isEditing = true;
    if (this.user) {
      this.updatedUser = { ...this.user }; // Clone user data for editing
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }

  updatedUserProfile() {
    if (!this.user) return;
  
    this.userService.updateUserProfile(this.user.userId, this.updatedUser).subscribe(
      (updatedData) => {
        alert('User Profile Updated Successfully:');
        console.log('User Profile Updated Successfully:', updatedData);
        this.user = updatedData; // Update UI
        this.isEditing = false; // Close edit form
      },
      (error) => {
        console.error('Error Updating Profile:', error);
      }
    );
  }
  


}
