import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../services/paciente.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    standalone: true,
    selector: 'app-escritor-list',
    templateUrl: './escritor-list.component.html',
    styleUrls: ['./escritor-list.component.css'],
    imports: [CommonModule,HeaderComponent]
})
export class EscritorListComponent implements OnInit {
    escritores: any[] = [];

    constructor(@Inject(PacienteService) private pacienteService: PacienteService) { }
    
    ngOnInit(): void {
        this.pacienteService.findAll().subscribe(
            (data: any[]) => {
                this.escritores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar escritores',error);
            }
        );
    }
}