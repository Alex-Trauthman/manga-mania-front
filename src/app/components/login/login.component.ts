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
import { AdministradorService } from '../../services/administrador.service';
import { FooterComponent } from '../template/footer/footer.component';
import { HeaderComponent } from '../template/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,RouterModule,MatSelectModule,CommonModule,HeaderComponent,FooterComponent]
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;
    adminId: number | null = null;
    username: string = 'adminadmin';
    password: string = '123456789123456789';
    errorMessage: string = '';

    constructor(private authService: AuthService,private router: Router,private formBuilder: FormBuilder,private administradorService: AdministradorService,private usuarioService: UsuarioService,private activatedRoute: ActivatedRoute) {
        this.formGroup = this.formBuilder.group({
            username: [null,Validators.required,Validators.minLength(1),Validators.maxLength(80)],
            senha: [null,Validators.required,Validators.minLength(1),Validators.maxLength(60)],
        })
    };

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

    onLogin() {
        /* 
                this.authService.login(this.username, this.password).subscribe((response: any) => {
                        if(response) {
                            this.router.navigateByUrl('/');
                        } else {
                            this.errorMessage = 'Usuário ou senha inválidos.';
                        }
                    }
                )
                this.authService.login(this.username, this.password).then((response: any) => {
                    if(response) {
                        localStorage.setItem('usuario', btoa(JSON.stringify(response)));
                        this.router.navigateByUrl('/');
                    } else {
                        this.errorMessage = 'Usuário ou senha inválidos.';
                    }
                })
                return this.authService.login(this.username, this.password).subscribe(
                    response => {
                        if(response) {
                            this.router.navigateByUrl('/');
                        } else {
                            this.errorMessage = 'Usuário ou senha inválidos.';
                        }
                    },
                    error => {
                        if(error.status === 404) this.errorMessage = "Usuário não encontrado.";
                        else this.errorMessage = 'Ocorreu um erro ao realizar login.';
                    }
                )
         */
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
        senha: {
            required: 'Senha é obrigatória.',
            minlength: 'Senha deve conter ao menos 6 letras.',
            maxlength: 'Senha deve conter no máximo 60 letras.',
            apiError: 'API_ERROR'
        }
    }
}