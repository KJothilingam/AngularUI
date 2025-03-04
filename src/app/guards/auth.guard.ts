import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const userRole = authService.getUserRole();
  const requiredRole = route.data?.['role']; 

  console.log('Is Logged In:', isLoggedIn);
  console.log('User Role:', userRole);
  console.log('Required Role:', requiredRole);

 
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole !== userRole) {
    if (userRole === 'ADMIN') {
      router.navigate(['/admin']);
    } else if (userRole === 'RENTER') {
      router.navigate(['/user']);
    } else {
      router.navigate(['/login']); 
    }
    return false;
  }

  return true; 
};
