import { HttpEvent,HttpHandler,HttpInterceptor,HttpInterceptorFn,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { };

    intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        if(authToken) {
            const authRequest = request.clone({
                setHeaders: { Authorization: `Bearer ${authToken}` }
            });
            return next.handle(authRequest);
        }
        return next.handle(request);
    }
}