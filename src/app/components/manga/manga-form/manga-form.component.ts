import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GeneroManga, GeneroMangaMap } from '../../../models/generoManga.model';
import { AutorService } from '../../../services/autorManga.service';
import { MangaService } from '../../../services/manga.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-manga-form',
    standalone: true,
    templateUrl: './manga-form.component.html',
    styleUrls: ['./manga-form.component.css'],
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, MatSelectModule, CommonModule, FormsModule]
})
export class MangaFormComponent implements OnInit {
    formGroup: FormGroup;
    manga: any = {};
    autores: any[] = [];
    generos = Object.entries(GeneroMangaMap);
    mangaId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private mangaService: MangaService,
        private autorMangaService: AutorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            nomeImagem: [''],
            paginas: [null, Validators.required],
            preco: [null, Validators.required],
            sinopse: ['',[Validators.required, Validators.minLength(30)]],
            lancamento: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]], // anoPublicação -> modelo java
            estoque: [null, Validators.required],
            color: [''],
            idAutor: [null, Validators.required],
            genero: [null, Validators.required],
            capitulos: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.autorMangaService.findAll().subscribe((data: any[]) => (this.autores = data));
        this.activatedRoute.params.subscribe(params => {
            this.mangaId = params['id'] ? +params['id'] : null;
            if (this.mangaId) {
                this.loadManga(this.mangaId);
            }
        });
    }

    loadManga(id: number): void {
        this.mangaService.findById(id).subscribe(manga => {
            this.formGroup.patchValue(manga);
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
            const manga = this.formGroup.value;
            console.log('Form Data:', manga); // Debugging: Log form data
            console.log('Genero Value:', manga.genero); // Debugging: Log genero value
            if (this.mangaId) {
                console.log('Updating manga with ID:', this.mangaId); // Debugging: Log update action
                this.mangaService.update(manga).subscribe(() => {
                    alert('Manga atualizado com sucesso!'); // Debugging: Log success
                    console.log('Update successful'); // Debugging: Log success
                    this.router.navigateByUrl('/mangas');
                }, error => {
                    alert('Erro ao atualizar o manga!'); // Debugging: Log error
                    console.error('Update error:', error); // Debugging: Log error
                });
            } else {
                console.log('Inserting new manga'); // Debugging: Log insert action
                this.mangaService.insert(manga).subscribe(() => {
                    alert('Manga cadastrado com sucesso!'); // Debugging: Log success
                    console.log('Insert successful'); // Debugging: Log success
                    this.router.navigateByUrl('/mangas');
                }, error => {
                    alert('Erro ao cadastrar o manga!'); // Debugging: Log error
                    console.error('Insert error:', error); // Debugging: Log error
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if (id) {
            this.mangaService.delete(id).subscribe(() => {
                alert('Manga excluído com sucesso!'); // Debugging: Log success
                console.log('Delete successful'); // Debugging: Log success
                this.router.navigateByUrl('/mangas');
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