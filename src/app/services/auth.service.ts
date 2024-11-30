import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject,Observable,tap } from "rxjs";
import { Usuario } from "../models/usuario.model";
import { LocalStorageService } from "./local-storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/auth';
    private tokenKey = 'jwt_token';
    private usuarioLogadoKey = 'usuario_logado';
    private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);

    constructor(private httpClient: HttpClient,private localStorageService: LocalStorageService,private jwtHelper: JwtHelperService) {
        this.init();
    }

    private init(): void {
        const usuario = this.localStorageService.getItem(this.usuarioLogadoKey);
        if(usuario) {
            this.usuarioLogadoSubject.next(usuario);
        }
    }

    public login(username: string,password: string): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}`,{ username,senha: password },{ observe: 'response' }).pipe(
            tap((res: any) => {
                if(res.headers.get('Authorization') ?? '') {
                    this.setToken(res.headers.get('Authorization') ?? '');
                    if(res.body) {
                        this.setUsuarioLogado(res.body);
                        this.usuarioLogadoSubject.next(res.body);
                    }
                }
            })
        );
    }

    setUsuarioLogado(usuario: Usuario): void {
        this.localStorageService.setItem(this.usuarioLogadoKey,usuario);
    }

    setToken(token: string): void {
        this.localStorageService.setItem(this.tokenKey,token);
    }

    getUsuarioLogado() {
        return this.usuarioLogadoSubject.asObservable();
    }

    getToken(): string | null {
        return this.localStorageService.getItem(this.tokenKey);
    }

    removeToken(): void {
        this.localStorageService.removeItem(this.tokenKey);
    }

    removeUsuarioLogado(): void {
        this.localStorageService.removeItem(this.usuarioLogadoKey);
        this.usuarioLogadoSubject.next(null);
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        if(!token) {
            return true;
        }
        try {
            return this.jwtHelper.isTokenExpired(token);
        } catch(error) {
            console.error('Token invalido',error);
            return true;
        }
    }
}