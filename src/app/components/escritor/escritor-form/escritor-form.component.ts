import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';
import { EscritorNovelService } from '../../../services/escritor.service';

@Component({
    standalone: true,
    selector: 'app-escritor-form',
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './escritor-form.component.html',
    styleUrl: './escritor-form.component.css'
})
export class EscritorFormComponent {
    formGroup: FormGroup;
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

    constructor(private formBuilder: FormBuilder,private escritorNovelService: EscritorNovelService,private router: Router) {
        this.formGroup = this.formBuilder.group({
            nome: ['', Validators.required], 
            lancamento: ['', Validators.required], 
            nacionalidade: ['', Validators.required], 
            sexo: ['', Validators.required], 
        })
    };

    onSubmit() {
        console.log(this.escritor);
    }
}