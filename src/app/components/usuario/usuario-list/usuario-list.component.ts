import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatIconModule } from '@angular/material/icon';
import { Novel } from '../../../models/novel.model';

@Component({
    selector: 'app-usuario-list',
    standalone: true,
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.css'],
    imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatCardModule, MatToolbarModule, HeaderComponent, FooterComponent, MatIconModule]
})
export class UsuarioListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'username', 'email', 'cpf', 'endereco', 'sexo', 'actions'];
    usuarios: Usuario[] = [];
    // novels: Novel[] = [];

    constructor(private usuarioService: UsuarioService, private router: Router) {}

    ngOnInit(): void {
        this.loadUsuarios();
    }

    loadUsuarios(): void {
        this.usuarioService.findAll().subscribe((data: Usuario[]) => {
            this.usuarios = data;
        });
    }

    editUsuario(id: number): void {
        this.router.navigate(['/usuario', id]);
    }

    deleteUsuario(id: number): void {
        this.usuarioService.delete(id).subscribe(() => {
            this.loadUsuarios();
        });
    }
}