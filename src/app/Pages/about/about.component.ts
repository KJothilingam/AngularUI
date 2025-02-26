import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.autoSlide();
    }
  }

  autoSlide() {
    if (isPlatformBrowser(this.platformId)) {
      const slider = document.getElementById('slider'); // Example usage of document
      if (slider) {
        // Perform slider operations
      }
    }
  }
}
  