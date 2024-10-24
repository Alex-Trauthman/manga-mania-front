import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../header/header.component';
import { TarefaService } from '../../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]
})
export class TarefaListComponent implements OnInit {
  tarefas: any[] = [];

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.tarefaService.findAll().subscribe(
      (data: any) => {
        this.tarefas = data;
      },
      (error: any) => {
        console.error('Erro ao buscar tarefas', error);
      }
    );
  }
}