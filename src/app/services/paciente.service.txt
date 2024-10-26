import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PacienteService {
    private baseUrl = 'http://localhost:8081/pacientes';

    constructor(private httpClient: HttpClient) {
    }
    findAll(): Observable<Paciente[]> {
        return this.httpClient.get<Paciente[]>(this.baseUrl);
    }
    findById(): Observable<Paciente> {
        return this.httpClient.get<Paciente>(`${this.baseUrl}/id`);
    }
    insert(paciente: Paciente): Observable<Paciente> {
        return this.httpClient.post<Paciente>(this.baseUrl,paciente);
    }
    update(paciente: Paciente): Observable<Paciente> {
        return this.httpClient.put<Paciente>(this.baseUrl,paciente);
    }
    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}search/${id}`);
    }
    findByCpf(cpf: string): Observable<Paciente> {
        return this.httpClient.get<Paciente>(`${this.baseUrl}/search/cpf/${cpf}`);
    }
    findByObs(obs: string): Observable<Paciente[]> {
        return this.httpClient.get<Paciente[]>(`${this.baseUrl}/search/obs/${obs}`);
    }
}
