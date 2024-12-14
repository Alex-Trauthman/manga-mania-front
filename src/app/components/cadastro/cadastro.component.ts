import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterLoginComponent } from '../template/footer-login/footer-login.component';
import { HeaderLoginComponent } from '../template/header-login/header-login.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  imports: [CommonModule, MatFormFieldModule,ReactiveFormsModule ,MatInputModule, MatButtonModule, MatCardModule, MatSelectModule, HeaderLoginComponent, FooterLoginComponent],
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private usuarioService: UsuarioService,
    
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(60)]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      cpf: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      endereco: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
      sexo: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;
      this.usuarioService.insert(usuario).subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.showSnackbarTopPosition("Erro ao cadastrar usuário.");
        },
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.formGroup.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    if (control?.hasError('minlength')) {
      return 'Valor muito curto.';
    }
    if (control?.hasError('maxlength')) {
      return 'Valor muito longo.';
    }
    if (control?.hasError('email')) {
      return 'Email inválido.';
    }
    return '';
  }

  showSnackbarTopPosition(content: string) {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
