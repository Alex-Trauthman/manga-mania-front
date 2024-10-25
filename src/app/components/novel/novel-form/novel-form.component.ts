import { CommonModule,NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-novel-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatToolbarModule,NgIf,ReactiveFormsModule,RouterModule],
    templateUrl: './novel-form.component.html',
    styleUrl: './novel-form.component.css'
})
export class NovelFormComponent {
    manga: any = {
        nome: "",
        nomeImagem: "",
        paginas: 0,
        preco: 0,
        sinopse: "",
        anoPublicacao: 0,
        estoque: 0,
        colorido: false,
        autor: 0,
        generoManga: 0,
    };

    generoIds = [
        { id: 2,descricao: 'Shoujo' },
        { id: 3,descricao: 'Seinen' },
        { id: 4,descricao: 'Josei' },
        { id: 5,descricao: 'Romance' },
        { id: 6,descricao: 'Fantasia' },
        { id: 7,descricao: 'Ação/Aventura' },
        { id: 8,descricao: 'Comedia' },
        { id: 9,descricao: 'Horror' },
        { id: 10,descricao: 'Sobrenatural' },
        { id: 11,descricao: 'Isekai' },
        { id: 12,descricao: 'Misterio' },
        { id: 13,descricao: 'Mecha' },
        { id: 14,descricao: 'Esporte' },
        { id: 15,descricao: 'Psicologico' },
        { id: 16,descricao: 'Kodomuke' }
    ];

    onSubmit() {
        console.log(this.manga);
    }
}