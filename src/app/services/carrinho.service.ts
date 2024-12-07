import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class CarrinhoService {
    private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
    carrinhos: Observable<ItemCarrinho[]> = this.carrinhoSubject;

    constructor(private localStorage: LocalStorageService) {
        // this.carrinhoSubject.next(localStorage.getItem('carrinho') || []);
        this.carrinhoSubject.next([{
            type: 1, 
            id: 1, 
            nome: "test", 
            quantidade: 1, 
            preco: 1
        }, {
            type: 1, 
            id: 2, 
            nome: "test", 
            quantidade: 1, 
            preco: 1
        }, {
            type: 1, 
            id: 3, 
            nome: "test", 
            quantidade: 1, 
            preco: 1
        }]);
    }

    obter(): ItemCarrinho[] {
        return this.carrinhoSubject.value;
    }

    adicionar(itemCarrinho: ItemCarrinho): void {
        const carrinhoAtual = this.carrinhoSubject.value;
        const itemExistente = carrinhoAtual.find(item => item.id === itemCarrinho.id);

        if(itemExistente) {
            itemExistente.quantidade += itemCarrinho.quantidade || 1;
        } else {
            carrinhoAtual.push(itemCarrinho);
        }

        this.carrinhoSubject.next(carrinhoAtual);
    }

    removerTudo(): void {
        this.localStorage.removeItem('carrinho');
        window.location.reload();
    }

    removerItem(itemCarrinho: ItemCarrinho): void {
        this.carrinhoSubject.next(this.carrinhoSubject.value.filter(item => item.id !== itemCarrinho.id));
        this.atualizar();
    }

    private atualizar(): void {
        this.localStorage.setItem('carrinho',this.carrinhoSubject.value);
    }
}
