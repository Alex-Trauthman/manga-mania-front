import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProfissionalService {
    private baseUrl = 'http://localhost:8081/profissionais';

    constructor(private httpClient: HttpClient) {
    }
    findByCpfAndSenha(cpf: string,senha: string) {  
        return this.httpClient.get<boolean>(`${this.baseUrl}?login=${cpf}&senha=${senha}`);
    }
}