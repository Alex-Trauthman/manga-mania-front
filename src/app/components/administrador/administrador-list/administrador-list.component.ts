import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { Administrador } from '../../../models/administrador.model';
import { AdministradorService } from '../../../services/administrador.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from "../../template/footer/footer.component";
import { HeaderComponent } from "../../template/header/header.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-administrador-list',
    standalone: true,
    templateUrl: './administrador-list.component.html',
    styleUrls: ['./administrador-list.component.css'],
    imports: [MatPaginatorModule,CommonModule,RouterModule,MatTableModule,MatButtonModule,MatCardModule,MatToolbarModule,FooterComponent,HeaderComponent]
})
export class AdministradorListComponent implements OnInit {
    displayedColumns: string[] = ['id','username','email','cpf','actions'];
    administradores: Administrador[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private administradorService: AdministradorService,private router: Router) { }

    ngOnInit(): void {
        this.loadAdministradores();
    }

    paginar(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this.ngOnInit();
    }

    loadAdministradores(): void {
        this.administradorService.findAll(this.page, this.pageSize).subscribe((data: Administrador[]) => {
            this.administradores = data;
        });
        this.administradorService.count().subscribe(data => {this.totalRecords = data});
    }

    editAdministrador(id: number): void {
        this.router.navigate(['admin/administrador/edit',id]);
    }

    deleteAdministrador(id: number): void {
        this.administradorService.delete(id).subscribe(() => {
            this.loadAdministradores();
        });
    }
}