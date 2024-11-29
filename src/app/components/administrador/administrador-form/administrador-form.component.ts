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
import { AdministradorService } from '../../../services/administrador.service';
import { FooterComponent } from '../../template/footer/footer.component';
import { HeaderComponent } from '../../template/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-administrador-form',
    standalone: true,
    templateUrl: './administrador-form.component.html',
    styleUrls: ['./administrador-form.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,RouterModule,MatSelectModule,CommonModule,HeaderComponent,FooterComponent]
})
export class AdministradorFormComponent implements OnInit {
    formGroup: FormGroup;
    adminId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private administradorService: AdministradorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            username: [null,Validators.required,Validators.minLength(4),Validators.maxLength(80)],
            email: [null,Validators.required,Validators.minLength(6),Validators.maxLength(60)],
            senha: [null,Validators.required,Validators.minLength(6),Validators.maxLength(60)],
            cpf: [null,Validators.required,Validators.minLength(10),Validators.maxLength(12)]
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.adminId = params['id'] ? +params['id'] : null;
            if(this.adminId) {
                this.loadAdministrador(this.adminId);
            }
        });

    }

    initializeForm(): void {
        const admin = this.activatedRoute.snapshot.data['admin'];
        if(admin) {
            this.formGroup.patchValue(admin);
        }
    }

    loadAdministrador(id: number): void {
        this.administradorService.findById(id).subscribe(admin => {
            this.formGroup.patchValue(admin);
        });
        this.formGroup.markAllAsTouched();
    }

    salvar(): void {
        if(this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        if(this.formGroup.valid) {
            const administrador = this.formGroup.value;
            if(administrador.id) {
                this.administradorService.update(administrador).subscribe(() => {
                    this.router.navigateByUrl('/admin/administrador');
                },error => {
                    this.tratarErros(error);
                });
            } else {
                this.administradorService.insert(administrador).subscribe(() => {
                    this.router.navigateByUrl('/admin/administrador');
                },error => {
                    this.tratarErros(error);
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if(id) {
            this.administradorService.delete(id).subscribe(() => {
                this.router.navigateByUrl('/admin/administrador');
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
        username: {
            required: 'Nome de usuário é obrigatório.',
            minlength: 'Nome deve conter ao menos 4 letras.',
            maxlength: 'Nome deve conter no máximo 80 letras.',
            apiError: 'API_ERROR'
        },
        email: {
            required: 'Email é obrigatório.',
            minlength: 'Email deve conter ao menos 6 letras.',
            maxlength: 'Email deve conter no máximo 60 letras.',
            apiError: 'API_ERROR'
        },
        senha: {
            required: 'Senha é obrigatório.',
            minlength: 'Senha deve conter ao menos 6 letras.',
            maxlength: 'Senha deve conter no máximo 60 letras.',
            apiError: 'API_ERROR'
        },
        cpf: {
            required: 'CPF é obrigatório.',
            minlength: 'CPF deve conter ao menos 10 letras.',
            maxlength: 'CPF deve conter no máximo 12 letras.',
            apiError: 'API_ERROR'
        },
    }
}