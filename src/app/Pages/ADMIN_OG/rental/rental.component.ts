import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../../service/rental.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
// import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  imports: [NavBarComponent,CommonModule],
})
export class RentalComponent implements OnInit {
  rentals: any[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getAllRentals().subscribe(data => {
      this.rentals = data.sort((a, b) => b.id - a.id); // Sort rentals in descending order
    });
  }
  
  // loadRentals(): void {
  //   this.rentalService.getAllRentals().subscribe(data => {
  //     this.rentals = data;
  //   });
  // }
}
