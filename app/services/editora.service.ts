import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Editora } from '../models/editora.model';

@Injectable({
    providedIn: 'root'
})
export class EditoraService {
    private baseUrl = 'http://localhost:8000/editora';

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<Editora[]> {
        return this.httpClient.get<Editora[]>(this.baseUrl);
    }

    findById(id: number): Observable<Editora> {
        return this.httpClient.get<Editora>(`${this.baseUrl}/${id}`);
    }

    insert(editora: Editora): Observable<Editora> {
        const data = {
            nome: editora.nome
        };
        return this.httpClient.post<Editora>(this.baseUrl,data);
    }

    update(editora: Editora): Observable<Editora> {
        const data = {
            nome: editora.nome
        };
        return this.httpClient.put<Editora>(`${this.baseUrl}/${editora.id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }

}
