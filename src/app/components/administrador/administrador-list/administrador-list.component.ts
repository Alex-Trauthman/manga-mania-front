import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorService } from '../../../services/administrador.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-administrador-list',
    templateUrl: './administrador-list.component.html',
    styleUrls: ['./administrador-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent]
})
export class AdministradorListComponent implements OnInit {
    administradores: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(AdministradorService) private administradorService: AdministradorService) { }

    ngOnInit(): void {
        this.administradorService.findAll(this.page,this.pageSize).subscribe(
            (data: any[]) => {
                this.administradores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar administradores',error);
            }
        );
    }
}