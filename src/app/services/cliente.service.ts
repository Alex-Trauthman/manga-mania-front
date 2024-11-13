/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private baseUrl = 'http://localhost:8000/clientes';

    constructor(private httpClient: HttpClient) { }

    findAll(page?: number,pageSize?: number): Observable<Cliente[]> {
        let params = {};
        if(page !== undefined && pageSize !== undefined) {
            params = {
                page: page.toString(),
                pageSize: pageSize.toString()
            }
        }
        return this.httpClient.get<Cliente[]>(this.baseUrl, {params});
    }

    count(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }

    findById(id: number): Observable<Cliente> {
        return this.httpClient.get<Cliente>(`${this.baseUrl}/${id}`);
    }

    insert(cliente: Cliente): Observable<Cliente> {
        const data = {
            nome: cliente.nome
        };
        return this.httpClient.post<Cliente>(this.baseUrl, data);
    }

    update(cliente: Cliente): Observable<Cliente> {
        const data = {
            nome: cliente.nome
        };
        return this.httpClient.put<Cliente>(`${this.baseUrl}/${cliente.id}`, data);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }

}
 */