import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ItemCarrinho } from '../../models/item-carrinho';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { SidebarService } from '../../services/sidebar.service';
import { FooterComponent } from '../template/footer/footer.component';
import { HeaderComponent } from '../template/header/header.component';

@Component({
    selector: 'app-compra',
    standalone: true,
    templateUrl: './compra.component.html',
    styleUrls: ['./compra.component.css'],
    imports: [NgIf, ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, NgFor, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, HeaderComponent, FooterComponent]
})
export class ConfirmarCompraComponent implements OnInit, OnDestroy {
    carrinhoItens: ItemCarrinho[] = [];
    userRole: string | null = null;
    usuarioLogado: Usuario | null = null;
    enderecoForm: FormGroup;
    private subscription = new Subscription();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private sidebarService: SidebarService,
        private authService: AuthService,
        private carrinhoService: CarrinhoService,
        private localStorageService: LocalStorageService
    ) {
        this.enderecoForm = this.formBuilder.group({
            email: [{ value: '', disabled: true }],
            rua: [''],
            numero: [''],
            cep: [''],
            cidade: [''],
            estado: ['']
        });
    }

    ngOnInit(): void {
        this.carrinhoService.carrinhos.subscribe((items: ItemCarrinho[]) => {
            this.carrinhoItens = items;
        });
        this.subscription.add(this.authService.getUsuarioLogado().subscribe(usuario => {
            this.usuarioLogado = usuario;
            this.userRole = this.authService.getUserRole();
            if (this.usuarioLogado) {
                this.enderecoForm.patchValue({
                    email: this.usuarioLogado.email,
                    rua: this.usuarioLogado.endereco?.rua || '',
                    numero: this.usuarioLogado.endereco?.numero || '',
                    cep: this.usuarioLogado.endereco?.cep || '',
                    cidade: this.usuarioLogado.endereco?.cidade || '',
                    estado: this.usuarioLogado.endereco?.estado || ''
                });
            }
        }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    calcularTotal(): number {
        return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0);
    }

    comprasfinalizadas(): void {
        this.router.navigate(['comprasfinalizadas']);
    }
}