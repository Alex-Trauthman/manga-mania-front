import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-autor-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './autor-form.component.html',
    styleUrl: './autor-form.component.css'
})
export class AutorFormComponent {
    autor: any = {
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
        console.log(this.autor);
    }
}