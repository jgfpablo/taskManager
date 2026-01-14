import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {

 const auth = inject(Auth);
 const router = inject(Router);

//  if (!auth.isLogged()) {
//     router.navigate(['/login']);
//     return false;
//   }
return auth.isLogged()
    ? true
    : router.parseUrl('/login');



  
    return true;
};




