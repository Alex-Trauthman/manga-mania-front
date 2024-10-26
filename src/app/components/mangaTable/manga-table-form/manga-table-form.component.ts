import { CommonModule,NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { GeneroNovel } from '../../../models/generoNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';
import { NovelService } from '../../../services/novel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-manga-table-form',
    standalone: true,
    templateUrl: './manga-table-form.component.html',
    styleUrls: ['./manga-table-form.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,
        MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,
        RouterModule,MatSelectModule,CommonModule]
})
export class MangaTableFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: any[] = [];
    generos = Object.entries(GeneroNovel);
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private formBuilder: FormBuilder, private novelService: NovelService, private escritorService: EscritorNovelService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.formGroup = this.formBuilder.group({
            // id: [null],
            nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
            nomeImagem: [''],
            paginas: [null,Validators.required],
            preco: [null,Validators.required],
            sinopse: ['',[Validators.required,Validators.minLength(30)]],
            lancamento: [null,[Validators.required,Validators.min(1000),Validators.max(9999)]], // anoPublicação -> modelo java
            estoque: [null,Validators.required],
            color: [null,Validators.required],
            idAutor: [null,Validators.required],
            genero: [null,Validators.required],
        });
    }

    ngOnInit(): void {
        this.escritorService.findAll(this.page, this.pageSize).subscribe((data) => (this.autores = data));
        this.initializeForm();
    }

    initializeForm(): void {
        const novel = this.activatedRoute.snapshot.data['novel'];
        if(novel) {
            this.formGroup.patchValue(novel);
        }
    }

    salvar(): void {
        if(this.formGroup.valid) {
            const novel = this.formGroup.value;
            if(novel.id) {
                this.novelService.update(novel).subscribe(() => this.router.navigateByUrl('/novels'));
            } else {
                this.novelService.insert(novel).subscribe(() => this.router.navigateByUrl('/novels'));
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
