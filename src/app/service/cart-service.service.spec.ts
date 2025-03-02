import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ Import for HTTP testing
import { CartService } from './cart-service.service';
// import { CartService } from './cart.service'; // ✅ Corrected import path

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Added HTTP testing module
      providers: [CartService] // ✅ Registering service properly
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
