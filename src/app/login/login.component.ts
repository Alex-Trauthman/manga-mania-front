import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule,FormsModule]
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService,private router: Router) { }

    onLogin() {
console.log({username: this.username, password: this.password});

        this.authService.login(this.username,this.password).subscribe(
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
    }
}