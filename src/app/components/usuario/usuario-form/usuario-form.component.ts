import { CommonModule,NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,ValidationErrors,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { SexoMap } from '../../../models/sexo.model';
import { UsuarioService } from '../../../services/usuario.service';
import { FooterComponent } from '../../template/footer/footer.component';
import { HeaderComponent } from '../../template/header/header.component';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,
        MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,
        RouterModule,MatSelectModule,CommonModule,HeaderComponent,FooterComponent]
})
export class UsuarioFormComponent implements OnInit {
    formGroup: FormGroup;
    usuarioId: number | null = null;
    sexoIds = Object.entries(SexoMap);

    constructor(
        private formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            username: [null,Validators.required,Validators.minLength(4),Validators.maxLength(80)],
            email: [null,Validators.required,Validators.minLength(6),Validators.maxLength(60)],
            senha: [null,Validators.required,Validators.minLength(6),Validators.maxLength(60)],
            cpf: [null,Validators.required,Validators.minLength(10),Validators.maxLength(12)],
            endereco: [null,Validators.required,Validators.minLength(4),Validators.maxLength(80)],
            sexo: [null,Validators.required]
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.usuarioId = params['id'] ? +params['id'] : null;
            if(this.usuarioId) {
                this.loadUsuario(this.usuarioId);
            }
        });

    }

    initializeForm(): void {
        const usuario = this.activatedRoute.snapshot.data['usuario'];
        if(usuario) {
            this.formGroup.patchValue(usuario);
        }
    }
    loadUsuario(id: number): void {
        this.usuarioService.findById(id).subscribe(usuario => {
            this.formGroup.patchValue(usuario);
        });
        this.formGroup.markAllAsTouched();
    }

    salvar(): void {
        if(this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        if(this.formGroup.valid) {
            const usuario = this.formGroup.value;
            if(usuario.id) {
                this.usuarioService.update(usuario).subscribe(() => {
                    this.router.navigateByUrl('/admin/usuario');
                },error => {
                    this.tratarErros(error);
                });
            } else {
                this.usuarioService.insert(usuario).subscribe(() => {
                    this.router.navigateByUrl('/admin/usuario');
                },error => {
                    this.tratarErros(error);
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if(id) {
            this.usuarioService.delete(id).subscribe(() => {
                this.router.navigateByUrl('/admin/usuario');
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
            minlength: 'Nome de usuário deve conter ao menos 4 letras.',
            maxlength: 'Nome de usuário deve conter no máximo 80 letras.',
            apiError: 'API_ERROR'
        },
        email: {
            required: 'Email é obrigatório.',
            minlength: 'Email de usuário deve conter ao menos 6 letras.',
            maxlength: 'Email de usuário deve conter no máximo 60 letras.',
            apiError: 'API_ERROR'
        },
        senha: {
            required: 'Senha é obrigatório.',
            minlength: 'Senha de usuário deve conter ao menos 6 letras.',
            maxlength: 'Senha de usuário deve conter no máximo 60 letras.',
            apiError: 'API_ERROR'
        },
        cpf: {
            required: 'CPF é obrigatório.',
            minlength: 'CPF deve conter ao menos 10 letras.',
            maxlength: 'CPF de usuário deve conter no máximo 12 letras.',
            apiError: 'API_ERROR'
        },
        endereco: {
            required: 'Endereço é obrigatório.',
            minlength: 'Endereço deve conter ao menos 4 letras.',
            maxlength: 'Endereço deve conter no máximo 80 letras.',
            apiError: 'API_ERROR'
        },
        sexo: {
            required: 'O sexo é obrigatório.',
            apiError: 'API_ERROR'
        }
    }
}