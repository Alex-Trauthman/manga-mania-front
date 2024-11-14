import { CommonModule,NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,ValidationErrors,Validators } from '@angular/forms';
import { ActivatedRoute,Router,RouterLink,RouterModule } from '@angular/router';
import { GeneroNovel,GeneroNovelMap } from '../../../models/generoNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';
import { NovelService } from '../../../services/novel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs/internal/Observable';
import { HeaderComponent } from '../../template/header/header.component';
import { FooterComponent } from '../../template/footer/footer.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-novel-form',
    standalone: true,
    templateUrl: './novel-form.component.html',
    styleUrls: ['./novel-form.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,
        MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,
        RouterModule,MatSelectModule,CommonModule,HeaderComponent,FooterComponent]
})
export class NovelFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: any[] = [];
    generos = Object.entries(GeneroNovelMap);
    novelId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private novelService: NovelService,
        private escritorService: EscritorNovelService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
            paginas: [null,Validators.required],
            preco: [null,Validators.required],
            sinopse: ['',[Validators.required,Validators.minLength(30)]],
            lancamento: [null,[Validators.required,Validators.min(1000),Validators.max(9999)]], // anoPublicação -> modelo java
            estoque: [null,Validators.required],
            idAutor: [null,Validators.required],
            genero: [null,Validators.required],
            capitulos: [null,Validators.required]
        });
    }

    ngOnInit(): void {
        this.escritorService.findAll().subscribe((data) => (this.autores = data));
        this.activatedRoute.params.subscribe(params => {
            this.novelId = params['id'] ? +params['id'] : null;
            if(this.novelId) {
                this.loadNovel(this.novelId);
            }
        });

    }

    initializeForm(): void {
        const novel = this.activatedRoute.snapshot.data['novel'];
        if(novel) {
            this.formGroup.patchValue(novel);
        }
    }
    loadNovel(id: number): void {
        this.novelService.findById(id).subscribe(novel => {
            this.formGroup.patchValue(novel);
        });
        this.formGroup.markAllAsTouched();
    }

    salvar(): void {
        if(this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        if(this.formGroup.valid) {
            const novel = this.formGroup.value;
            if(novel.id) {
                this.novelService.update(novel).subscribe(() => {
                    this.router.navigateByUrl('/novel');
                },error => {
                });
            } else {
                this.novelService.insert(novel).subscribe(() => {
                    this.router.navigateByUrl('/novel');
                },error => {
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if(id) {
            this.novelService.delete(id).subscribe(() => {
                this.router.navigateByUrl('/novel');
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
            minlength: 'O nome deve conter ao menos 3 letras.',
            maxlength: 'O nome deve conter no máximo 40 letras.',
            apiError: 'API_ERROR'
        },
        sinopse: {
            required: 'A sinopse é obrigatório.',
            minlength: 'A sinopse deve conter ao menos 30 letras.',
            // maxlength: 'A sinopse deve conter no máximo 40 letras.', -> não tem limite
            apiError: 'API_ERROR'
        },
        genero: {
            required: 'O gênero é obrigatório.',
            // minlength: 'O gênero deve conter ao menos 3 letras.', -> não tem limite
            // maxlength: 'O gênero deve conter no máximo 40 letras.', -> não tem limite
            apiError: 'API_ERROR'
        },
        idAutor: {
            required: 'O autor é obrigatório.',
            // minlength: 'O autor deve conter ao menos 3 letras.', -> sei lá
            // maxlength: 'O autor deve conter no máximo 40 letras.', -> sei lá
            apiError: 'API_ERROR'
        },
        lancamento: {
            required: 'O nome é obrigatório.',
            // minlength: 'O nome deve conter ao menos 3 letras.', => int
            // maxlength: 'O nome deve conter no máximo 40 letras.', => int
            apiError: 'API_ERROR'
        },
        preco: {
            required: 'O nome é obrigatório.',
            // minlength: 'O nome deve conter ao menos 3 letras.', => int
            // maxlength: 'O nome deve conter no máximo 40 letras.', => int
            apiError: 'API_ERROR'
        },
        estoque: {
            required: 'O nome é obrigatório.',
            // minlength: 'O nome deve conter ao menos 3 letras.', => int
            // maxlength: 'O nome deve conter no máximo 40 letras.', => int
            apiError: 'API_ERROR'
        },
        paginas: {
            required: 'O nome é obrigatório.',
            // minlength: 'O nome deve conter ao menos 3 letras.', => int
            // maxlength: 'O nome deve conter no máximo 40 letras.', => int
            apiError: 'API_ERROR'
        },
        capitulos: {
            required: 'O nome é obrigatório.',
            // minlength: 'O nome deve conter ao menos 3 letras.', => int
            // maxlength: 'O nome deve conter no máximo 40 letras.', => int
            apiError: 'API_ERROR'
        },
    }
}