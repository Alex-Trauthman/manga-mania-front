import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
    selector: 'app-administrador-list',
    templateUrl: './administrador-list.component.html',
    styleUrls: ['./administrador-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent,FooterComponent]
})
export class AdministradorListComponent implements OnInit {
    administradores: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(UsuarioService) private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.usuarioService.findAll(this.page,this.pageSize).subscribe(
            (data: any[]) => {
                this.administradores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar administradores',error);
            }
        );
    }
}