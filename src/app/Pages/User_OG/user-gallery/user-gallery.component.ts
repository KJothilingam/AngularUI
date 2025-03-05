import { Component } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { AboutComponent } from "../../../Main_App/about/about.component";

@Component({
  selector: 'app-user-gallery',
  imports: [UserNavComponent, AboutComponent],
  templateUrl: './user-gallery.component.html',
  styleUrl: './user-gallery.component.css'
})
export class UserGalleryComponent {

}
