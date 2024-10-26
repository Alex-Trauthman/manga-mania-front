import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EscritorNovelService } from '../../../services/escritor.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'app-escritor-form',
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule],
    templateUrl: './escritor-form.component.html',
    styleUrl: './escritor-form.component.css'
})
export class EscritorTableFormComponent {
    formGroup: FormGroup;
    constructor(private formBuilder: FormBuilder, private escritorService: EscritorNovelService, private router: Router) {
        this.formGroup = this.formBuilder.group({
            nome: ['', Validators.required],
            sigla: ['', Validators.required]
        })
    }

    onSubmit() {
        if(this.formGroup.valid) {
            const novoEstado = this.formGroup.value;
            this.escritorService.insert(novoEstado).subscribe({
                next: (escritorCadastrado) => {
                    this.router.navigateByUrl('/escritors');
                },
                error: (err) => {
                    console.log('Erro ao salvar', + JSON.stringify(err));
                }
            })
        }
    }
}