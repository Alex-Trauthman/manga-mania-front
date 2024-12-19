import { Component, OnInit } from '@angular/core';

import { Pedido } from '../../../models/pedido.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PedidoService } from '../../../services/pedido.service';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
    imports:[NgFor,DecimalPipe],
    standalone: true,
    selector: 'app-pedido-list',
    templateUrl: './pedido-list.component.html',
    styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {
    pedidos: Pedido[] = [];

    constructor(private pedidoService: PedidoService,private router: Router,private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.pedidoService.findAll().subscribe((data: Pedido[]) => {
            this.pedidos = data;
        });
    }
}