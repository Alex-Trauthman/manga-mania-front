import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../services/paciente.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-escritorNovel-list',
    templateUrl: './escritorNovel-list.component.html',
    styleUrls: ['./escritorNovel-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent]
})
export class EscritorNovelListComponent implements OnInit {
    pacientes: any[] = [];

    constructor(@Inject(PacienteService) private pacienteService: PacienteService) { }

    ngOnInit(): void {
        this.pacienteService.findAll().subscribe(
            (data: any[]) => {
                this.pacientes = data;
            },
            (error: any) => {
                console.error('Erro ao buscar pacientes',error);
            }
        );
    }
}