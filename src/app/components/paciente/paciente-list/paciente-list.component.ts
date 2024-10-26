import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../services/paciente.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-paciente-list',
    templateUrl: './paciente-list.component.html',
    styleUrls: ['./paciente-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent]
})
export class PacienteListComponent implements OnInit {
    pacientes: any[] = [];
  totalRecords = 0;
  pageSize = 2;
  page = 0;

    constructor(@Inject(PacienteService) private pacienteService: PacienteService) { }

    ngOnInit(): void {
        this.pacienteService.findAll(this.page, this.pageSize).subscribe(
            (data: any[]) => {
                this.pacientes = data;
            },
            (error: any) => {
                console.error('Erro ao buscar pacientes',error);
            }
        );
    }
}