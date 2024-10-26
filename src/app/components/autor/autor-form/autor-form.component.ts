import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';
import { AutorService } from '../../../services/autorManga.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-autor-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './autor-form.component.html',
    styleUrl: './autor-form.component.css'
})
export class AutorFormComponent {
    formGroup: FormGroup;
    autor: any = {
        nome: "",
        lancamento: "",
        nacionalidade: "",
        sexo: "",
        mangas: []
    };

    constructor(private formBuilder: FormBuilder,private autorService: AutorService,private router: Router) {
        this.formGroup = this.formBuilder.group({
            nome: ['', Validators.required], 
            lancamento: ['', Validators.required], 
            nacionalidade: ['', Validators.required], 
            sexo: ['', Validators.required]
        })
    };

    sexoIds = [
        { id: 1,descricao: 'Feminino' },
        { id: 2,descricao: 'Masculino' }
    ];

    onSubmit() {
        console.log(this.autor);
    }
}