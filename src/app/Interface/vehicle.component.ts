export interface Vehicle {
    type: string;
    id: number;
    name: string;
    numberPlate: string;
    rentalPrice: number;
    availableCount: number;
    totalKmsDriven: number;
    needsService: boolean;
    lastServiceAt: number;
    imageUrl: string;
  }
  