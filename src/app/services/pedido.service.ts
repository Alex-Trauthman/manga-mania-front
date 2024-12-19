import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pedido } from "../models/pedido.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })

export class AdministradorService {
    private baseUrl = "http://localhost:8000/pedidos";

    constructor(private httpClient: HttpClient) { }

    findAll(page?: number,pageSize?: number): Observable<Pedido[]> {
        let params = {};
        if(page !== undefined && pageSize !== undefined) {
            params = {
                page: page.toString(),
                pageSize: pageSize.toString()
            }
        }
        return this.httpClient.get<Pedido[]>(this.baseUrl,{ params });
    }

    searchByUser(id: number): Observable<Pedido[]> {
        return this.httpClient.get<Pedido[]>(`${this.baseUrl}/search/user/${id}`);
    }

    searchByEndereco(content: string): Observable<Pedido[]> {
        return this.httpClient.get<Pedido[]>(`${this.baseUrl}/search/endereco/${content}`);
    }

    minhasCompras(page?: number,pageSize?: number): Observable<Pedido[]> {
        let params = {};
        if(page !== undefined && pageSize !== undefined) {
            params = {
                page: page.toString(),
                pageSize: pageSize.toString()
            }
        }
        return this.httpClient.get<Pedido[]>(this.baseUrl,{ params });
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

    findById(id: number): Observable<Pedido> {
        return this.httpClient.get<Pedido>(`${this.baseUrl}/${id}`);
    }

    insert(pedido: Pedido): Observable<Pedido> {
        const data = {
        };
        return this.httpClient.post<Pedido>(this.baseUrl,data);
    }

    update(pedido: Pedido): Observable<Pedido> {
        const data = {
        };
        return this.httpClient.put<Pedido>(`${this.baseUrl}/${pedido.id}`,data);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}