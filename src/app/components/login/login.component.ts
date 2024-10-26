import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AdministradorService } from '../../services/administrador.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class LoginComponent {
    formGroup: FormGroup;
    username: string = 'adminadmin';
    password: string = '123456789123456789';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private administradorService: AdministradorService) {
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required],
            senha: ['', Validators.required]
        })
    };

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
                        console.log(error);
                    }
                )
         */
    }
}