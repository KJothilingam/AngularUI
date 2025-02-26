import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('container') container!: ElementRef;

  toggleForm(isSignUp: boolean): void {
    if (isSignUp) {
      this.container.nativeElement.classList.add('active');
    } else {
      this.container.nativeElement.classList.remove('active');
    }
  }
}
