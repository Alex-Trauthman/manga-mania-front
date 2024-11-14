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
    selector: 'app-escritor-form',
    standalone: true,
    templateUrl: './escritor-form.component.html',
    styleUrls: ['./escritor-form.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,
        MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,
        RouterModule,MatSelectModule,CommonModule,HeaderComponent,FooterComponent]
})
export class EscritorFormComponent implements OnInit {
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
                    this.router.navigateByUrl('/novels');
                },error => {
                });
            } else {
                this.novelService.insert(novel).subscribe(() => {
                    this.router.navigateByUrl('/novels');
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
        anoNascimento: {
            required: 'O ano de nascimento é obrigatório.',
            // minlength: 'O ano de nascimento deve conter ao menos 3 letras.', -> int
            // maxlength: 'O ano de nascimento deve conter no máximo 40 letras.', -> int
            apiError: 'API_ERROR'
        },
        nacionalidade: {
            required: 'A nacionalidade é obrigatório.',
            minlength: 'A nacionalidade deve conter ao menos 2 letras.',
            maxlength: 'A nacionalidade deve conter no máximo 30 letras.',
            apiError: 'API_ERROR'
        },
        sexo: {
            required: 'Sexo é obrigatório.',
            // minlength: 'Sexo deve conter ao menos 3 letras.', -> int
            // maxlength: 'Sexo deve conter no máximo 40 letras.', -> int
            apiError: 'API_ERROR'
        }
    }
}