import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { ItemCarrinho } from '../models/item-carrinho';
import { Usuario } from '../models/usuario.model';
import { Endereco } from '../models/endereco.model';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private baseUrl = 'http://localhost:8000/pedidos';

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<Pedido[]> {
        return this.httpClient.get<Pedido[]>(this.baseUrl);
    }

    findMyPedidos(): Observable<Pedido[]>{
        return this.httpClient.get<Pedido[]>(`${this.baseUrl}/meus`)
    }

    count(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }

    findById(id: number): Observable<Pedido> {
        return this.httpClient.get<Pedido>(`${this.baseUrl}/${id}`);
    }

    insert(itens: ItemCarrinho[], endereco: Endereco): Observable<Pedido> {
        const data = {
            itens: itens.map(e => Object.assign({idManga: e.id, desconto: 0}, e)), endereco
        };
console.log(data);

        return this.httpClient.post<Pedido>(this.baseUrl, data);
    }

    update(pedido: Pedido): Observable<Pedido> {
        const data = {
            endereco: {
                rua: pedido.endereco.rua,
                numero: pedido.endereco.numero,
                cep: pedido.endereco.cep,
                cidade: pedido.endereco.cidade,
                estado: pedido.endereco.estado
            },
            itens: pedido.itens.map(item => ({
                idManga: item.manga.id,
                preco: item.preco,
                desconto: item.desconto,
                quantidade: item.quantidade
            }))
        };
        return this.httpClient.put<Pedido>(`${this.baseUrl}/${pedido.id}`, data);
    }
}