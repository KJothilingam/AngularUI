export interface Rental {
    id: number;
    borrower: {
      userId: number;
      userName: string;
      phoneNo: string;
      email: string;
      securityDeposit: number;
    };
    vehicle: {
      id: number;
      name: string;
      numberPlate: string;
      totalKmsDriven: number;
      type: string;
      rentalPrice: number;
      imageUrl: string;
    };
    rentalDate: string;
    returnDate: string | null;
    fineAmount: number;
    isReturned: boolean;
    extensionCount: number;
    totalCost: number;
  }
  