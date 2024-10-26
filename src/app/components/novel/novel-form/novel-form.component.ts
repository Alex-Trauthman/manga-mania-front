import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GeneroNovel, GeneroNovelMap } from '../../../models/generoNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';
import { NovelService } from '../../../services/novel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-novel-form',
    standalone: true,
    templateUrl: './novel-form.component.html',
    styleUrls: ['./novel-form.component.css'],
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, MatSelectModule, CommonModule]
})
export class NovelFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: any[] = [];
    generos = Object.entries(GeneroNovelMap);

    constructor(
        private formBuilder: FormBuilder,
        private novelService: NovelService,
        private escritorService: EscritorNovelService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            paginas: [null, Validators.required],
            preco: [null, Validators.required],
            sinopse: ['',[Validators.required, Validators.minLength(30)]],
            lancamento: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]], // anoPublicação -> modelo java
            estoque: [null, Validators.required],
            idAutor: [null, Validators.required], // Ensure this matches the service method
            genero: [null, Validators.required],
            capitulos: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.escritorService.findAll().subscribe((data) => (this.autores = data));
        this.initializeForm();
    }

    initializeForm(): void {
        const novel = this.activatedRoute.snapshot.data['novel'];
        if (novel) {
            this.formGroup.patchValue(novel);
        }
    }

    salvar(): void {
        if (this.formGroup.invalid) {
            console.log(this.formGroup.controls); // Logs each control's status and errors
            this.formGroup.markAllAsTouched(); // Ensure all errors are shown in the UI
            return;
        }
        console.log('Salvar method called'); // Debugging: Log method call
        if (this.formGroup.valid) {
            const novel = this.formGroup.value;
            console.log('Form Data:', novel); // Debugging: Log form data
            if (novel.id) {
                this.novelService.update(novel).subscribe(() => {
                    console.log('Update successful'); // Debugging: Log success
                    this.router.navigateByUrl('/novels');
                }, error => {
                    console.error('Update error:', error); // Debugging: Log error
                });
            } else {
                this.novelService.insert(novel).subscribe(() => {
                    console.log('Insert successful'); // Debugging: Log success
                    this.router.navigateByUrl('/novels');
                }, error => {
                    console.error('Insert error:', error); // Debugging: Log error
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if (id) {
            this.novelService.delete(id).subscribe(() => {
                console.log('Delete successful'); // Debugging: Log success
                this.router.navigateByUrl('/novels');
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
        return '';
    }
}