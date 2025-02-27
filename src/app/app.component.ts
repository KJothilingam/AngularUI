import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./Main_App/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./Pages/login/login.component"; 

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    FooterComponent,
],
    templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular_UI';

constructor(){
  console.log("constructor");
}

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

// changeTitle(){
//   this.title="Tittle-changed";
// }
}
