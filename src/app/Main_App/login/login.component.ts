import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
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
