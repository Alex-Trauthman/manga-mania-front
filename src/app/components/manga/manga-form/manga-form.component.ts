import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-manga-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './manga-form.component.html',
    styleUrl: './manga-form.component.css'
})
export class MangaFormComponent {
    paciente: any = {
        nome: '',
        cpf: '',
        email: '',
        nomeMae: '',
        anotacao: '',
        dataNascimento: '',
        cartaoSus: '',
        obs: '',
        sexo: true,
        telefone: { numero: '' },
        endereco: '',
        dataUltimaConsulta: '',
        condicaoIds: []
    };

    condicoes = [
        { id: 1,descricao: 'Grávidas' },
        { id: 2,descricao: 'Fumantes' },
        { id: 3,descricao: 'Idosos' },
        { id: 4,descricao: 'Diabéticos' }
    ];

    onSubmit() {
        console.log(this.paciente);
    }
}