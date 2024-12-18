import { CommonModule,NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit, inject } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,ValidationErrors,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldControl,MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { AutorService } from '../../../services/autorManga.service';
import { MangaService } from '../../../services/manga.service';
import { HeaderAdminComponent } from "../../template/header-admin/header-admin.component";
import { FooterAdminComponent } from "../../template/footer-admin/footer-admin.component";
import { AutorManga } from '../../../models/autorManga.model';
import { Manga } from '../../../models/manga.model';
import { MatIcon } from '@angular/material/icon';
import { GeneroManga,GeneroMangaMap } from '../../../models/generoManga.model';
import { ExclusaoComponent } from '../../confirmacao/exclusao/exclusao.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-manga-form',
    standalone: true,
    templateUrl: './manga-form.component.html',
    styleUrls: ['./manga-form.component.css'],
    imports: [CommonModule,FooterAdminComponent,HeaderAdminComponent,MatIcon,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatToolbarModule,NgIf,ReactiveFormsModule,RouterModule]
})
export class MangaFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: AutorManga[] = [];
    generos = Object.entries(GeneroMangaMap);
    mangaId: number | null = null;
    readonly dialog = inject(MatDialog);

    fileName: string = '';
    selectedFile: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;

    constructor(private formBuilder: FormBuilder,private mangaService: MangaService,private autorService: AutorService,private router: Router,private activatedRoute: ActivatedRoute) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
            sinopse: [null,[Validators.required,Validators.minLength(10),Validators.maxLength(1000)]],
            genero: [null,[Validators.required,Validators.min(0)]],
            idAutor: [null,[Validators.required,Validators.min(0)]],
            lancamento: [null,[Validators.required,Validators.min(0)]],
            color: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(12)]],
            preco: [null,[Validators.required,Validators.min(0)]],
            estoque: [null,[Validators.required,Validators.min(0)]],
            paginas: [null,[Validators.required,Validators.min(0)]],
            imageUrl: [null]
        });
    }

    ngOnInit(): void {
        this.autorService.findAll().subscribe((data) => {
            this.autores = data;
        });

        this.activatedRoute.params.subscribe(params => {
            this.mangaId = params['id'] ? +params['id'] : null;
            if(this.mangaId) this.loadManga(this.mangaId);
        });
        this.initializeForm();
    }

    initializeForm(): void {
        const manga = this.activatedRoute.snapshot.data['manga'];
        if(manga && manga.imageUrl) {
            this.imagePreview = this.mangaService.toImageUrl(manga.imageUrl);
            this.fileName = manga.imageUrl;
        }
    }

    private uploadImage(mangaId: number) {
        if(this.selectedFile) {
            this.mangaService.uploadImage(mangaId,this.selectedFile.name,this.selectedFile)
                .subscribe({
                    next: () => {
                        this.voltarPagina();
                    },
                    error: err => {
                    }
                })
        }
    }

    voltarPagina(): void {
        this.router.navigateByUrl('/admin/manga');
    }

    loadManga(id: number): void {
        if(id != null && id > 0) {
            this.mangaService.findById(id).subscribe(manga => {
                this.formGroup.patchValue(manga);
                this.formGroup.patchValue({ idAutor: manga.idAutor.id });
                // this.formGroup.patchValue({ genero: manga.genero.id });
                if(manga.imageUrl) {
                    this.imagePreview = this.mangaService.toImageUrl(manga.imageUrl);
                    this.fileName = manga.imageUrl;
                }
            });
            this.formGroup.markAllAsTouched();
        }
    }

    carregarImagemSelecionada(event: any) {
        this.selectedFile = event.target.files[0];

        if(this.selectedFile) {
            this.fileName = this.selectedFile.name;

            const reader = new FileReader();
            reader.onload = e => this.imagePreview = reader.result;
            reader.readAsDataURL(this.selectedFile);
        }
    }

    salvar() {
        this.formGroup.markAllAsTouched();
        if(this.formGroup.valid) {
            const manga = this.formGroup.value;


            const operacao = manga.id == null
                ? this.mangaService.insert(manga)
                : this.mangaService.update(manga);

            operacao.subscribe({
                next: (mangaCadastrada) => {

                    if(this.mangaId !== null) {
                        this.uploadImage(this.mangaId);
                    }

                    this.uploadImage(mangaCadastrada.id);
                },
                error: (error) => {
                    this.tratarErros(error);
                }
            });
        }
    }


    excluir(): void {
        const dialogRef = this.dialog.open(ExclusaoComponent);
        dialogRef.afterClosed().subscribe(result => {
            if(result === true) {
                const id = this.formGroup.get('id')?.value;
                if(id) {
                    this.mangaService.delete(id).subscribe(() => {
                        this.router.navigateByUrl('/admin/manga');
                    },error => {
                        this.tratarErros(error);
                    });
                }
            }
        });
    }

    getErrorMessage(controlName: string,errors: ValidationErrors | null | undefined): string {
        if(!errors) return "";
        for(const errorName in errors) {
            if(errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
                return this.errorMessages[controlName][errorName];
            }
        }
        return "Parâmetro inválido.";
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
            required: 'Nome é obrigatório.',
            minlength: 'Nome deve conter ao menos 3 caracteres.',
            maxlength: 'Nome deve conter no máximo 40 caracteres.',
            apiError: 'API_ERROR'
        },
        sinopse: {
            required: 'Sinopse é obrigatório.',
            minlength: 'Sinopse deve conter ao menos 10 caracteres.',
            maxlength: 'Sinopse deve conter no máximo 1000 caracteres.',
            apiError: 'API_ERROR'
        },
        genero: {
            required: 'Gênero é obrigatório.',
            min: 'Gênero deve ser maior do que 0.',
            apiError: 'API_ERROR'
        },
        idAutor: {
            required: 'Id do autor é obrigatório.',
            min: 'Id do autor deve ser maior do que 0.',
            apiError: 'API_ERROR'
        },
        lancamento: {
            required: 'Ano de lançamento é obrigatório.',
            min: 'Ano de lançamento deve ser maior do que 0.',
            apiError: 'API_ERROR'
        },
        color: {
            required: 'Color é obrigatório.',
            minlength: 'Color deve conter ao menos 1 caracteres.',
            maxlength: 'Color deve conter no máximo 12 caracteres.',
            apiError: 'API_ERROR'
        },
        preco: {
            required: 'Preço é obrigatório.',
            min: 'Preço deve ser maior do que 0.',
            apiError: 'API_ERROR'
        },
        estoque: {
            required: 'Estoque é obrigatório.',
            min: 'Estoque deve ser maior do que 0.',
            apiError: 'API_ERROR'
        },
        paginas: {
            required: 'Páginas é obrigatório.',
            min: 'Páginas deve ser maior do que 0.',
            apiError: 'API_ERROR'
        }
    }
}