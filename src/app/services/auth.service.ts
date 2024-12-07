import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject,Observable,tap } from "rxjs";
import { Usuario } from "../models/usuario.model";
import { LocalStorageService } from "./local-storage.service";

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

    private initUsuarioLogado():void {
        const usuario = this.localStorageService.getItem(this.usuarioLogadoKey);
        if (usuario) {
            // const usuarioLogado = JSON.parse(usuario);
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

        //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.httpClient.post(`${this.baseUrl}`, params, {observe: 'response'}).pipe(
        tap((res: any) => {
          const authToken = res.headers.get('Authorization') ?? '';
          if (authToken) {
            this.setToken(authToken);
            const usuarioLogado = res.body;
            //console.log(usuarioLogado);
            if (usuarioLogado) {
              this.setUsuarioLogado(usuarioLogado);
              this.usuarioLogadoSubject.next(usuarioLogado);
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