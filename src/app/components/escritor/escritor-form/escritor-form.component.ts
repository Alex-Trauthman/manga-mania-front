import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    standalone: true,
    selector: 'app-escritor-form',
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './escritor-form.component.html',
    styleUrl: './escritor-form.component.css'
})
export class EscritorFormComponent {
    escritor: any = {
        nome: "", 
        lancamento: "", 
        nacionalidade: "", 
        sexo: "", 
        mangas: []
    };

    sexoIds = [
        { id: 1,descricao: 'Feminino' },
        { id: 2,descricao: 'Masculino' }
    ];

    onSubmit() {
        console.log(this.escritor);
    }
}