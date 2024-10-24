import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exame } from '../models/exame.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExameService {
    private baseUrl = 'http://localhost:8081/exames';

    constructor(private httpClient: HttpClient) {
    }
    findAll(): Observable<Exame[]> {
        return this.httpClient.get<Exame[]>(this.baseUrl);
    }
    findById(): Observable<Exame> {
        return this.httpClient.get<Exame>(`${this.baseUrl}/id`);
    }
    insert(exame: Exame): Observable<Exame> {
        return this.httpClient.post<Exame>(this.baseUrl,exame);
    }
    update(exame: Exame): Observable<Exame> {
        return this.httpClient.put<Exame>(this.baseUrl,exame);
    }
    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
    findByProfissional(id: number): Observable<Exame[]> {
        return this.httpClient.get<Exame[]>(`${this.baseUrl}/search/profissional/${id}`);
    }
    findByPaciente(id: number): Observable<Exame[]> {
        return this.httpClient.get<Exame[]>(`${this.baseUrl}/search/paciente/${id}`);
    }
    findByTipo(tipo: string): Observable<Exame[]> {
        return this.httpClient.get<Exame[]>(`${this.baseUrl}/search/tipo/${tipo}`);
    }
}
