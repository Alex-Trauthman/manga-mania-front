import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../services/paciente.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-autor-list',
    templateUrl: './autor-list.component.html',
    styleUrls: ['./autor-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent]
})
export class AutorListComponent implements OnInit {
    autores: any[] = [];

    constructor(@Inject(PacienteService) private pacienteService: PacienteService) { }

    ngOnInit(): void {
        this.pacienteService.findAll().subscribe(
            (data: any[]) => {
                this.autores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar autores',error);
            }
        );
    }
}