import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Administrador } from "../models/administrador.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })

export class AdministradorService {
    private baseUrl = "http://localhost:8000/pedidos";

    constructor(private httpClient: HttpClient) { }

    findAll(page?: number,pageSize?: number): Observable<Administrador[]> {
        let params = {};
        if(page !== undefined && pageSize !== undefined) {
            params = {
                page: page.toString(),
                pageSize: pageSize.toString()
            }
        }
        return this.httpClient.get<Administrador[]>(this.baseUrl,{ params });
    }

    searchByUser(id: number): Observable<Administrador[]> {
        return this.httpClient.get<Administrador[]>(`${this.baseUrl}/search/user/${id}`);
    }

    searchByEndereco(content: string): Observable<Administrador[]> {
        return this.httpClient.get<Administrador[]>(`${this.baseUrl}/search/endereco/${content}`);
    }

    minhasCompras(page?: number,pageSize?: number): Observable<Administrador[]> {
        let params = {};
        if(page !== undefined && pageSize !== undefined) {
            params = {
                page: page.toString(),
                pageSize: pageSize.toString()
            }
        }
        return this.httpClient.get<Administrador[]>(this.baseUrl,{ params });
    }

    pagarPix(): void {
        this.httpClient.patch(`${this.baseUrl}/pagar/pix`, {});
    }

    pagarCredito(parcelas: number): void {
        this.httpClient.patch(`${this.baseUrl}/pagar/credito/${parcelas}`, {});
    }

    pagarDebito(): void {
        this.httpClient.patch(`${this.baseUrl}/pagar/debito`, {});
    }

    count(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }

    findById(id: number): Observable<Administrador> {
        return this.httpClient.get<Administrador>(`${this.baseUrl}/${id}`);
    }

    insert(administrador: Administrador): Observable<Administrador> {
        const data = {
            username: administrador.username,
            email: administrador.email,
            senha: administrador.senha,
            cpf: administrador.cpf
        };
        return this.httpClient.post<Administrador>(this.baseUrl,data);
    }

    update(administrador: Administrador): Observable<Administrador> {
        const data = {
            username: administrador.username,
            email: administrador.email,
            senha: administrador.senha,
            cpf: administrador.cpf
        };
        return this.httpClient.put<Administrador>(`${this.baseUrl}/${administrador.id}`,data);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}