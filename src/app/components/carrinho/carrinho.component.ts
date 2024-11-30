import { NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/item-carrinho';
import { Router } from '@angular/router';

@Component({
    selector: 'app-carrinho',
    standalone: true,
    templateUrl: './carrinho.component.html',
    styleUrls: ['./carrinho.component.css'],
    imports: [NgIf,ReactiveFormsModule]
})
export class CarrinhoComponent implements OnInit {
    carrinhoItens: ItemCarrinho[] = [];

    constructor(private carrinhoService: CarrinhoService,private router: Router) {
    }

    ngOnInit(): void {
        this.carrinhoService.carrinhos().subscribe((items: ItemCarrinho[]) => {
            this.carrinhoItens = items;
        });
    }

    removeItem(item: ItemCarrinho) {
        this.carrinhoService.removerItem(item);
    }

    calcularTotal(): number {
        return this.carrinhoItens.reduce((total,item) => total + item.quantidade + item.preco,0);
    }

    finalizarCompra() {
        // verificar se está logado
        // finalizar compra se sim
    }
}