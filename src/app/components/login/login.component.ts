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
import { AdministradorService } from '../../services/administrador.service';
import { FooterComponent } from '../template/footer/footer.component';
import { HeaderComponent } from '../template/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { FooterLoginComponent } from '../template/footer-login/footer-login.component';
import { HeaderLoginComponent } from '../template/header-login/header-login.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login-component',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [NgIf,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,MatToolbarModule,RouterModule,MatSelectModule,CommonModule,HeaderLoginComponent,FooterLoginComponent]
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

    constructor(
        private activatedRoute: ActivatedRoute,private snackBar: MatSnackBar,private authService: AuthService,private formBuilder: FormBuilder,private router: Router
    ) {
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            username: [null,[Validators.required,Validators.minLength(4),Validators.maxLength(80)]],
            senha: [null,[Validators.required,Validators.minLength(6),Validators.maxLength(60)]],
        });
    }

    onSubmit() {
        if(this.formGroup.valid) {
            const username = this.formGroup.get('username')?.value;
            const password = this.formGroup.get('password')?.value;

            this.authService.login(username,password).subscribe({
                next: () => {
                    this.router.navigateByUrl('/admin');
                },
                error: (err: any) => {
                    console.log(err);
                    this.showSnackbarTopPosition("Username ou senha inválido");
                }
            })

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

    showSnackbarTopPosition(content: any) {
        this.snackBar.open(content,'fechar',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center"
        });
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