import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../Interface/user.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, NavBarComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users = signal<User[]>([]);
  showUpdateForm: boolean = false;
  selectedUser: User | null = null;
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.fetchUsers();
  }

  trackByUserId(index: number, user: User) {
    return user.userId;
  }

  // fetchUsers() {
  //   this.http.get<User[]>('http://localhost:8080/renters').subscribe({
  //     next: (data) => {
  //       this.users.set([...data]);  
  //       this.cdr.detectChanges();
  //     },
  //     error: (error) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   });
  // }
  fetchUsers() {
    this.http.get<User[]>('http://localhost:8080/renters').subscribe({
      next: (data) => {
        // Sort users alphabetically by `userName`
        const sortedUsers = data.sort((a, b) => a.userName.localeCompare(b.userName));
        this.users.set(sortedUsers); 
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
  
  
  editUser(user: User) {
    this.selectedUser = { ...user };
    this.showUpdateForm = true;  
  }
  

  updateUser() {
    if (this.selectedUser) {
      this.http.put(`http://localhost:8080/update/${this.selectedUser.userId}`, this.selectedUser).subscribe({
        next: () => {
          this.showUpdateForm = false; 
          this.fetchUsers();
          this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Failed to update user!', 'Close', { duration: 3000 });
        }
      });
    }
  }
  
  cancelUpdate() {
    this.showUpdateForm = false;
    this.selectedUser = null;
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.apiUrl}delete/${userId}`, { responseType: 'text' }).subscribe({
        next: () => {
          this.fetchUsers();
          alert('User deleted successfully!');
        },
        error: (error) => {
          console.error('Delete error:', error);
          alert('Failed to delete user!');
        }
      });
    }
  }
}
