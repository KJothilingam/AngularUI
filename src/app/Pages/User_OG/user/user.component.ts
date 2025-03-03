import { Component } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { VehicleComponent } from "../../../Main_App/vehicle/vehicle.component";
import { VehicleListComponent } from "../vehicle-list/vehicle-list.component";
import { OrderComponent } from "../order/order.component";

@Component({
  selector: 'app-user',
  imports: [RouterLink, UserNavComponent, VehicleComponent, VehicleListComponent, OrderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }
}
