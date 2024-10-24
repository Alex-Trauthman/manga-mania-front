import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfissionalService } from '../services/profissional.service';

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

    constructor(private authService: ProfissionalService,private router: Router) { }

    onLogin() {
        this.authService.findByCpfAndSenha(this.username,this.password).subscribe(
            response => {
                if(response) {
                    this.router.navigateByUrl('/pacientes');
                } else {
                    this.errorMessage = 'Usuário ou senha inválidos.';
                }
            },
            error => {
                this.errorMessage = 'Ocorreu um erro ao realizar login.';
            }
        );
    }
}