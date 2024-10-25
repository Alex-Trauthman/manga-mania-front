import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../services/paciente.service';
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

    constructor(@Inject(PacienteService) private pacienteService: PacienteService) { }

    ngOnInit(): void {
        this.pacienteService.findAll().subscribe(
            (data: any[]) => {
                this.usuarios = data;
            },
            (error: any) => {
                console.error('Erro ao buscar usuarios',error);
            }
        );
    }
}