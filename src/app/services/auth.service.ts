import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })

export class AuthService {
    logged = false;
    private baseUrl = "http://localhost:8000/auth";

    constructor(private httpClient: HttpClient) { }

    login(username: string, password: string) {
        return this.httpClient.post<any>(`${this.baseUrl}`, {username, senha: password }).subscribe(response => {
            if(response){
                this.logged = true;
                localStorage.setItem("JWT_Token", response.token);
                return true;
            };
            return false;
        });
    }
}