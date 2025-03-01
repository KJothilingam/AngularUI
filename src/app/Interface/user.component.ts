export interface User {
  userId: number;
  userName: string;
  email: string; // ✅ Added email field
  address: string;
  phoneNo: string;
  securityDeposit: number;
  imageUrl?: string; // Optional image URL
}

