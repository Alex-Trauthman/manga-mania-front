import { CommonModule,NgFor,NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/item-carrinho';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule,MatCardActions,MatCardContent,MatCardTitle,MatCardFooter } from '@angular/material/card';

@Component({
    selector: 'app-carrinho',
    standalone: true,
    templateUrl: './carrinho.component.html',
    styleUrls: ['./carrinho.component.css'],
    imports: [NgIf,ReactiveFormsModule,CommonModule,MatCardModule,MatButtonModule,NgFor,MatCardActions,MatCardContent,MatCardTitle,MatCardFooter]
})
export class CarrinhoComponent implements OnInit {
    carrinhoItens: ItemCarrinho[] = [];
    private usuarioLogadoKey = 'usuario_logado';

    constructor(private carrinhoService: CarrinhoService,private localStorageService: LocalStorageService,private router: Router) {
    }

    ngOnInit(): void {
        this.carrinhoService.carrinhos.subscribe((items: ItemCarrinho[]) => {
            this.carrinhoItens = items;
        });
    }

    removeItem(item: ItemCarrinho) {
        this.carrinhoService.removerItem(item);
    }

    goTo(item: ItemCarrinho) {
        this.router.navigateByUrl(`/${item.type === 1 ? "manga" : "novel"}/${item.id}`);
    }

    calcularTotal(): number {
        return this.carrinhoItens.reduce((total,item) => total + item.quantidade + item.preco,0);
    }

    finalizarCompra(): void {
        const usuario = this.localStorageService.getItem(this.usuarioLogadoKey);
        if(!usuario) {
            this.router.navigateByUrl("/login");
            return;
        };
        this.router.navigateByUrl("/comprasfinalizadas");
    }
}