export interface Vehicle {
  id: number;
  name: string;
  numberPlate: string;
  totalKmsDriven: number;
    type: string;
    rentalPrice: number;
    available: boolean;  // Ensure this field is present
    // availableCount: number;
    needsService: boolean;
    lastServiceAt: number;
    imageUrl: string;
  }
  
  