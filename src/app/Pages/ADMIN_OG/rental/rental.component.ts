import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { FooterComponent } from "../../../Main_App/footer/footer.component";

@Component({
  selector: 'app-rental',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {

}
