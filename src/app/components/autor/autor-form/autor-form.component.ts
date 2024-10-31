import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutorService } from '../../../services/autorManga.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-autor-form',
    standalone: true,
    templateUrl: './autor-form.component.html',
    styleUrls: ['./autor-form.component.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatSelectModule, RouterModule, HeaderComponent, FooterComponent]
})
export class AutorFormComponent implements OnInit {
    formGroup: FormGroup;
    autorId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private autorService: AutorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            anoNascimento: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
            nacionalidade: [null, Validators.required],
            sexo: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.autorId = params['id'] ? +params['id'] : null;
            if (this.autorId) {
                this.loadAutor(this.autorId);
            }
        });
    }

    loadAutor(id: number): void {
        this.autorService.findById(id).subscribe(autor => {
            this.formGroup.patchValue(autor);
        });
    }

    salvar(): void {
        if (this.formGroup.invalid) {
            console.log(this.formGroup.controls); // Logs each control's status and errors
            this.formGroup.markAllAsTouched(); // Ensure all errors are shown in the UI
            return;
        }
        console.log('Salvar method called'); // Debugging: Log method call
        if (this.formGroup.valid) {
            const autor = this.formGroup.value;
            console.log('Form Data:', autor); // Debugging: Log form data
            if (this.autorId) {
                console.log('Updating autor with ID:', this.autorId); // Debugging: Log update action
                this.autorService.update(autor).subscribe(() => {
                    alert('Autor atualizado com sucesso!'); // Debugging: Log success
                    console.log('Update successful'); // Debugging: Log success
                    this.router.navigateByUrl('/autores');
                }, error => {
                    alert('Erro ao atualizar o autor!'); // Debugging: Log error
                    console.error('Update error:', error); // Debugging: Log error
                });
            } else {
                console.log('Inserting new autor'); // Debugging: Log insert action
                this.autorService.insert(autor).subscribe(() => {
                    alert('Autor cadastrado com sucesso!'); // Debugging: Log success
                    console.log('Insert successful'); // Debugging: Log success
                    this.router.navigateByUrl('/autores');
                }, error => {
                    alert('Erro ao cadastrar o autor!'); // Debugging: Log error
                    console.error('Insert error:', error); // Debugging: Log error
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if (id) {
            this.autorService.delete(id).subscribe(() => {
                alert('Autor excluído com sucesso!'); // Debugging: Log success
                console.log('Delete successful'); // Debugging: Log success
                this.router.navigateByUrl('/autores');
            }, error => {
                console.error('Delete error:', error); // Debugging: Log error
            });
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.formGroup.get(controlName);
        if (control?.hasError('required')) return `${controlName} é obrigatório.`;
        if (control?.hasError('minlength'))
            return `${controlName} deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
        if (control?.hasError('maxlength'))
            return `${controlName} deve ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
        if (control?.hasError('min'))
            return `${controlName} deve ser maior ou igual a ${control.errors?.['min'].min}.`;
        if (control?.hasError('max'))
            return `${controlName} deve ser menor ou igual a ${control.errors?.['max'].max}.`;
        return '';
    }
}