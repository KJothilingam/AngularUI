export interface User {
  userId: number;
  userName: string;
  email: string; // ✅ Ensure this matches user.component.ts
  phoneNo: string;
  securityDeposit: number;
  imageUrl?: string; // ✅ Optional field
}
// export interface User {
//   userId: number;
//   userName: string;
//   email: string;  // ✅ Required field
//   phoneNo: string;
//   securityDeposit: number;
//   imageUrl?: string;
// }
