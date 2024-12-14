import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Verificar se o token expirou
    if (authService.isTokenExpired()) {
        authService.removeToken();
        authService.removeUsuarioLogado();
        router.navigateByUrl("/login");
        return false;
    }

    // Verificar se o usuário tem permissão de acesso (exemplo: apenas admins)
    const role = authService.getUserRole();  // Método que retorna o papel do usuário
    if (role && route.data['role'] && route.data['role'] !== role) {
        router.navigateByUrl("/access-denied"); // Redireciona para página de acesso negado
        return false;
    }

    // Caso o token não tenha expirado e o papel esteja correto
    return true;
};
