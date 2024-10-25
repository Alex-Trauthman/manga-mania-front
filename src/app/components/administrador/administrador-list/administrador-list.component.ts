import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../services/paciente.service';
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

    constructor(@Inject(PacienteService) private pacienteService: PacienteService) { }

    ngOnInit(): void {
        this.pacienteService.findAll().subscribe(
            (data: any[]) => {
                this.administradores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar administradores',error);
            }
        );
    }
}