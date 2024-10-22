import { Component,OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-cliente-list',
    standalone: true,
    imports: [NgFor,MatTableModule,MatToolbarModule,MatIconModule,MatButtonModule,RouterModule],
    templateUrl: './cliente-list.component.html',
    styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'acao'];
    clientes: Cliente[] = [];

    constructor(private clienteService: ClienteService) { }

    ngOnInit(): void {
        this.clienteService.findAll().subscribe(data => { this.clientes = data; });
    }
}
