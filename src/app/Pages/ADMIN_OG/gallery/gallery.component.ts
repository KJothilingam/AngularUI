import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AboutComponent } from "../../../Main_App/about/about.component";

@Component({
  selector: 'app-gallery',
  imports: [NavBarComponent, AboutComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

}
