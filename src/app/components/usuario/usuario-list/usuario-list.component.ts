import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent]
})
export class UsuarioListComponent implements OnInit {
    usuarios: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(UsuarioService) private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.usuarioService.findAll(this.page,this.pageSize).subscribe(
            (data: any[]) => {
                this.usuarios = data;
            },
            (error: any) => {
                console.error('Erro ao buscar usuarios',error);
            }
        );
    }
}