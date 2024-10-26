import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })

export class AuthService {
    private baseUrl = "http://localhost:8000/login";

    constructor(private httpClient: HttpClient) { }

    login(username: string, password: string) {
console.log({username, password});

        let user1 = this.httpClient.post<boolean>(`${this.baseUrl}`, {body: {perfil: 1, username, password}});
        let user2 = this.httpClient.post<boolean>(`${this.baseUrl}`, {body: {perfil: 2, username, password}});
        return user1 || user2;
    }
}