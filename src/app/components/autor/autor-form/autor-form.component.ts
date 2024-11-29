import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,ValidationErrors,Validators } from '@angular/forms';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { AutorService } from '../../../services/autorManga.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../template/header/header.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-autor-form',
    standalone: true,
    templateUrl: './autor-form.component.html',
    styleUrls: ['./autor-form.component.css'],
    imports: [MatDatepickerModule,MatNativeDateModule,CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,MatSelectModule,RouterModule,HeaderComponent,FooterComponent],
    providers: [MatDatepickerModule]
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
            nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
            anoNascimento: [null,[Validators.required,Validators.min(2),Validators.maxLength(30)]],
            nacionalidade: [null,Validators.required],
            sexo: [null,Validators.required]
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.autorId = params['id'] ? +params['id'] : null;
            if(this.autorId) {
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
        if(this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        if(this.formGroup.valid) {
            const autor = this.formGroup.value;
            if(this.autorId) {
                this.autorService.update(autor).subscribe(() => {
                    this.router.navigateByUrl('/admin/autor');
                },error => {
                    this.tratarErros(error);
                });
            } else {
                this.autorService.insert(autor).subscribe(() => {
                    this.router.navigateByUrl('/admin/autor');
                },error => {
                    this.tratarErros(error);
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if(id) {
            this.autorService.delete(id).subscribe(() => {
                this.router.navigateByUrl('/admin/autor');
            },error => {
                this.tratarErros(error);
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
            required: 'Nome é obrigatório.',
            minlength: 'Nome deve conter ao menos 3 letras.',
            maxlength: 'Nome deve conter no máximo 40 letras.',
            apiError: 'API_ERROR'
        },
        anoNascimento: {
            required: 'Ano de nascimento é obrigatório.',
            min: 'Ano de nascimento deve ser maior do que 0.', 
            apiError: 'API_ERROR'
        },
        nacionalidade: {
            required: 'Nacionalidade é obrigatório.',
            minlength: 'Nacionalidade deve conter ao menos 2 letras.',
            maxlength: 'Nacionalidade deve conter no máximo 30 letras.',
            apiError: 'API_ERROR'
        },
        sexo: {
            required: 'Sexo é obrigatório.',
            apiError: 'API_ERROR'
        },

    }
}