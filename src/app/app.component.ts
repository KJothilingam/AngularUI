import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./Main_App/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    FormsModule,
    FooterComponent,
],
    templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_UI';

constructor(public authService: AuthService){
  console.log("constructor");
}
// constructor() {}

ngOnInit(){
  console.log("ngoninit");
  // this.changeTitle();
}
isSignUpMode = false;
user = { name: '', email: '', password: '' };

toggleForm(signUp: boolean) {
  this.isSignUpMode = signUp;
}

onSubmit(action: string) {
  console.log(`${action.toUpperCase()} form submitted:`, this.user);
}

}
