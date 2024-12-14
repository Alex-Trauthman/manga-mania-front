import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterLoginComponent } from '../template/footer-login/footer-login.component';
import { HeaderLoginComponent } from '../template/header-login/header-login.component';

@Component({
    selector: 'app-login-component',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatSelectModule, CommonModule, HeaderLoginComponent, FooterLoginComponent]
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;
    adminId: number | null = null;
    identificador: string = 'adminadmin'; // Campo flexível para qualquer string
    password: string = '123456789123456789';
    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar
    ) {
        this.formGroup = this.formBuilder.group({
            identificador: [null, [Validators.required]], // Apenas obrigatório, sem restrições de formato
            senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
        });
    }

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            identificador: [null, [Validators.required]], // Aceita qualquer string
            senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
        });
    }

    login() {
        if (this.formGroup.valid) {
            // Obtém os valores do formulário
            const identificador = this.formGroup.get('identificador')?.value;
            const password = this.formGroup.get('senha')?.value;
            const perfil = this.authService.getUserRole();
            this.authService.login(identificador, password).subscribe({
                next: () => {
                    this.router.navigateByUrl('/loja');
                    
                },
                error: (err: any) => {
                    console.log(err);
                    this.showSnackbarTopPosition("Identificador ou senha inválido");
                }
            });
        }
    }

    getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
        if (!errors) return "";
        for (const errorName in errors) {
            if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
                return this.errorMessages[controlName][errorName];
            }
        }
        return "Parâmetro inválido";
    }

    tratarErros(errorResponse: HttpErrorResponse) {
        if (errorResponse.status === 400) {
            if (errorResponse.error?.errors) {
                errorResponse.error.errors.forEach((validationError: any) => {
                    const formControl = this.formGroup.get(validationError.fieldName);
                    if (formControl) {
                        formControl.setErrors({ apiError: validationError.message });
                    }
                });
            }
        } else if (errorResponse.status < 400) {
        } else if (errorResponse.status >= 500) {
        }
    }

    showSnackbarTopPosition(content: any) {
        this.snackBar.open(content, 'fechar', {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center"
        });
    }

    errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
        identificador: {
            required: 'Este campo é obrigatório.',
            apiError: 'API_ERROR'
        },
        senha: {
            required: 'Senha é obrigatória.',
            minlength: 'Senha deve conter ao menos 6 caracteres.',
            maxlength: 'Senha deve conter no máximo 60 caracteres.',
            apiError: 'API_ERROR'
        }
    };
}
