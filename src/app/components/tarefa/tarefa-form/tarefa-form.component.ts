import { Component,Inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefaService } from '../../../services/tarefa.service';
import { StatusTarefa } from '../../../models/status-tarefa.model';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-tarefa-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './tarefa-form.component.html',
    styleUrls: ['./tarefa-form.component.css']
})
export class TarefaFormComponent implements OnInit {
    statusTarefas!: StatusTarefa[];
    tarefa: any = {
        id: null,
        nome: '',
        descricao: '',
        status: ''
    };

    constructor(@Inject(TarefaService) private tarefaService: TarefaService) { }

    ngOnInit(): void {
        this.statusTarefas = [
            StatusTarefa.EMANDAMENTO,
            StatusTarefa.CONCLUIDA,
            StatusTarefa.CANCELADA,
            StatusTarefa.AGUARDANDO
        ];
    }

    onSubmit() {
        this.tarefaService.insert(this.tarefa).subscribe(
            (response: any) => {
                console.log('Tarefa criada com sucesso',response);
            },
            (error: any) => {
                console.error('Erro ao criar tarefa',error);
            }
        );
    }
}