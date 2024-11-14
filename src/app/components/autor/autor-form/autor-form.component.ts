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

@Component({
    selector: 'app-autor-form',
    standalone: true,
    templateUrl: './autor-form.component.html',
    styleUrls: ['./autor-form.component.css'],
    imports: [CommonModule,FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,MatSelectModule,RouterModule,HeaderComponent,FooterComponent]
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
            anoNascimento: [null,[Validators.required,Validators.min(1900),Validators.max(new Date().getFullYear())]],
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
                    this.router.navigateByUrl('/autores');
                },error => {
                });
            } else {
                this.autorService.insert(autor).subscribe(() => {
                    this.router.navigateByUrl('/autores');
                },error => {
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if(id) {
            this.autorService.delete(id).subscribe(() => {
                this.router.navigateByUrl('/autores');
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
            // minlength: 'O ano de nascimento deve conter ao menos 2.', -> no quarkus é int, sem validação
            // maxlength: 'O ano de nascimento deve conter no máximo 10 letras.', -> no quarkus é int, sem validação
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
            // minlength: 'Sexo deve conter ao menos 2 letras.', -> sexo é int
            // maxlength: 'Sexo deve conter no máximo 10 letras.', -> sexo é int
            apiError: 'API_ERROR'
        },

    }
}