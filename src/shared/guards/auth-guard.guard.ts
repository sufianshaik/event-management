import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserLoginDetailsService } from '../services/authentication/user-login-details.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const _router : Router = inject(Router);
  const _userLoginService : UserLoginDetailsService = inject(UserLoginDetailsService);
  if (_userLoginService.isLogin){
    return true ;
  }
  _router.navigate(['/welcome']);
  return false ;
};
