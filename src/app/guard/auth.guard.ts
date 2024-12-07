import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route,state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if(authService.isTokenExpired()) {
        authService.removeToken();
        authService.removeUsuarioLogado();
        router.navigateByUrl("/login");
        return false;
    } else {
        return true;
    }
};
