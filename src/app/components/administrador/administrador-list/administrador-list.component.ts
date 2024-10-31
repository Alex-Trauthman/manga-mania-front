import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Administrador } from '../../../models/administrador.model';
import { AdministradorService } from '../../../services/administrador.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from "../../footer/footer.component";
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-administrador-list',
    standalone: true,
    templateUrl: './administrador-list.component.html',
    styleUrls: ['./administrador-list.component.css'],
    imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatCardModule, MatToolbarModule, FooterComponent, HeaderComponent]
})
export class AdministradorListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'username', 'email', 'cpf', 'actions'];
    administradores: Administrador[] = [];

    constructor(private administradorService: AdministradorService, private router: Router) {}

    ngOnInit(): void {
        this.loadAdministradores();
    }

    loadAdministradores(): void {
        this.administradorService.findAll().subscribe((data: Administrador[]) => {
            this.administradores = data;
        });
    }

    editAdministrador(id: number): void {
        this.router.navigate(['/administrador', id]);
    }

    deleteAdministrador(id: number): void {
        this.administradorService.delete(id).subscribe(() => {
            this.loadAdministradores();
        });
    }
}