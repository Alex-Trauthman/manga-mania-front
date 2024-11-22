import { CommonModule,NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,ValidationErrors,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { GeneroNovelMap } from '../../../models/generoNovel.model';
import { FooterComponent } from '../../template/footer/footer.component';
import { HeaderComponent } from '../../template/header/header.component';
import { MangaService } from '../../../services/manga.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AutorService } from '../../../services/autorManga.service';
import { GeneroMangaMap } from '../../../models/generoManga.model';

@Component({
    selector: 'app-manga-form',
    standalone: true,
    templateUrl: './manga-form.component.html',
    styleUrls: ['./manga-form.component.css'],
    imports: [CommonModule,FooterComponent,HeaderComponent,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatToolbarModule,NgIf,ReactiveFormsModule,RouterModule]
})
export class MangaFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: any[] = [];
    generos = Object.entries(GeneroMangaMap);
    mangaId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private mangaService: MangaService,
        private autorService: AutorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
            paginas: [null,Validators.required],
            preco: [null,Validators.required],
            sinopse: ['',[Validators.required,Validators.minLength(30)]],
            lancamento: [null,[Validators.required,Validators.min(1000),Validators.max(9999)]],
            estoque: [null,Validators.required],
            idAutor: [null,Validators.required],
            genero: [null,Validators.required],
            color: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.autorService.findAll().subscribe((data) => {
            this.autores = data;
        });
        this.activatedRoute.params.subscribe(params => {
            this.mangaId = params['id'] ? +params['id'] : null;
            if(this.mangaId) {
                this.loadManga(this.mangaId);
            }
        });

    }

    initializeForm(): void {
        const manga = this.activatedRoute.snapshot.data['manga'];
        if(manga) {
            this.formGroup.patchValue(manga);
        }
    }

    loadManga(id: number): void {
        if(id != null && id >0){
            this.mangaService.findById(id).subscribe(manga => {
                this.formGroup.patchValue(manga);
            });
            this.formGroup.markAllAsTouched();
        }
    }

    salvar(): void {
        if(this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        if(this.formGroup.valid) {
            const manga = this.formGroup.value;
            if(manga.id) {
                this.mangaService.update(manga).subscribe(() => {
                    this.router.navigateByUrl('/manga');
                },error => {
                });
            } else {
                this.mangaService.insert(manga).subscribe(() => {
                    this.router.navigateByUrl('/manga');
                },error => {
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if(id) {
            this.mangaService.delete(id).subscribe(() => {
                this.router.navigateByUrl('/manga');
            },error => {
            });
        }
    }

    getErrorMessage(controlName: string,errors: ValidationErrors | null | undefined): string {
        if(!errors) return "";
        for(const errorName in errors) {
            if(errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
                return this.errorMessages[controlName][errorName];
            }
        }
        return "parâmetro inválido";
    }

    tratarErros(errorResponse: HttpErrorResponse) {
        if(errorResponse.status === 400) {
            if(errorResponse.error?.errors) {
                errorResponse.error.errors.forEach((validationError: any) => {
                    const formControl = this.formGroup.get(validationError.fieldName);
                    if(formControl) {
                        formControl.setErrors({ apiError: validationError.message })
                    }
                });
            }
        } else if(errorResponse.status < 400) {
        } else if(errorResponse.status >= 500) {
        }
    }

    errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
        nome: {
            required: 'O nome é obrigatório.',
            minlength: 'O nome deve conter ao menos 2 letras.',
            maxlength: 'O nome deve conter no máximo 10 letras.',
            apiError: 'API_ERROR'
        },
        paginas: {
            required: 'Páginas é obrigatório.',
            minlength: 'Páginas deve conter ao menos 2 letras.',
            maxlength: 'Páginas deve conter no máximo 10 letras.',
            apiError: 'API_ERROR'
        },
        preco: {
            required: 'O preço é obrigatório.',
            minlength: 'O preço deve conter ao menos 2 letras.',
            maxlength: 'O preço deve conter no máximo 10 letras.',
            apiError: 'API_ERROR'
        },
        sinopse: {
            required: 'A sinopse é obrigatório.',
            minlength: 'A sinopse deve conter ao menos 30 letras.',
            // maxlength: 'A sinopse deve conter no máximo 40 letras.', -> não tem limite
            apiError: 'API_ERROR'
        },
        lancamento: {
            required: 'O ano de lançamento é obrigatório.',
            // minlength: 'O ano de lançamento deve conter ao menos 2 letras.', -> int
            // maxlength: 'O ano de lançamento deve conter no máximo 10 letras.', -> int
            apiError: 'API_ERROR'
        },
        estoque: {
            required: 'O estoque é obrigatório.',
            // minlength: 'O estoque deve conter ao menos 2 letras.', -> int
            // maxlength: 'O estoque deve conter no máximo 10 letras.', -> int
            apiError: 'API_ERROR'
        },
        idAutor: {
            required: 'O id do autor é obrigatório.',
            // minlength: 'O id do autor deve conter ao menos 2 letras.', -> int
            // maxlength: 'O id do autor deve conter no máximo 10 letras.', -> int
            apiError: 'API_ERROR'
        },
        genero: {
            required: 'Gênero é obrigatório.',
            // minlength: 'Gênero deve conter ao menos 2 letras.', -> int
            // maxlength: 'Gênero deve conter no máximo 10 letras.', -> int
            apiError: 'API_ERROR'
        },
        capitulos: {
            required: 'Os capítulos é obrigatório.',
            // minlength: 'Os capítulos deve conter ao menos 2 letras.', -> int
            // maxlength: 'Os capítulos deve conter no máximo 10 letras.', -> int
            apiError: 'API_ERROR'
        },

    }
}