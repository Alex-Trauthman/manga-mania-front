import { CommonModule,NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { GeneroNovel } from '../../../models/generoNovel.model';
import { EscritorNovelService } from '../../../services/escritorNovel.service';
import { EditoraService } from '../../../services/editora.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-editora-form',
    standalone: true,
    templateUrl: './editora-form.component.html',
    styleUrls: ['./editora-form.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,
        MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,
        RouterModule,MatSelectModule,CommonModule]
})
export class EditoraFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: any[] = [];
    generos = Object.entries(GeneroNovel);

    constructor(
        private formBuilder: FormBuilder,
        private novelService: EditoraService,
        private escritorService: EscritorNovelService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
            sinopse: ['',[Validators.required,Validators.minLength(30)]],
            genero: [null,Validators.required],
            idAutor: [null,Validators.required],
            lancamento: [null,[Validators.required,Validators.min(1000),Validators.max(9999)]],
            preco: [null,Validators.required],
            estoque: [null,Validators.required],
            paginas: [null,Validators.required],
            capitulos: [null,Validators.required],
        });
    }

    ngOnInit(): void {
        this.escritorService.findAll().subscribe((data) => (this.autores = data));
        this.initializeForm();
    }

    initializeForm(): void {
        const editora = this.activatedRoute.snapshot.data['editora'];
        if(editora) {
            this.formGroup.patchValue(editora);
        }
    }

    salvar(): void {
        if(this.formGroup.valid) {
            const editora = this.formGroup.value;
            if(editora.id) {
                this.novelService.update(editora).subscribe(() => this.router.navigateByUrl('/novels'));
            } else {
                this.novelService.insert(editora).subscribe(() => this.router.navigateByUrl('/novels'));
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if(id) {
            this.novelService.delete(id).subscribe(() => this.router.navigateByUrl('/novels'));
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.formGroup.get(controlName);
        if(control?.hasError('required')) return `${controlName} é obrigatório.`;
        if(control?.hasError('minlength'))
            return `${controlName} deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
        if(control?.hasError('maxlength'))
            return `${controlName} deve ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
        return '';
    }
}
