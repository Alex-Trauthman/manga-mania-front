import { Component,OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css'],
    imports: [FormsModule,CommonModule],
    standalone: true
})
export class PerfilComponent implements OnInit {
    usuario: Usuario | null = null;
    novaSenha: string = '';
    confimacao: string = '';
    senhaAntiga: string = '';
    newEmail: string = '';
    newAddress: string = '';
    message: string | null = null; constructor(
        private usuarioService: UsuarioService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.authService.getUsuarioLogado().subscribe({
            next: (usuario) => {
                if(usuario) {
                    this.usuario = usuario;
                }
            },
            error: (err) => {
                console.error('Erro ao carregar usuário:',err);
                this.message = 'Erro ao carregar os dados do usuário.';
            }
        });
    }

    changePassword() {
        if(this.novaSenha !== this.confimacao) {
            this.message = 'As senhas não coincidem!';
            return;
        }

        this.usuarioService.updateSenha(this.senhaAntiga,this.novaSenha,this.confimacao,).subscribe({
            next: (response) => {
                this.message = 'Senha alterada com sucesso!';
            },
            error: (err) => {
                this.message = 'Erro ao alterar a senha.';
                console.error('Erro ao alterar senha',err);
            }
        });
    }

    changeEmail() {
        if(!this.newEmail) {
            this.message = 'Por favor, insira um email válido.';
            return;
        }

        this.usuarioService.updateEmail(this.newEmail).subscribe({
            next: (response) => {
                this.message = 'Email alterado com sucesso!';
            },
            error: (err) => {
                this.message = 'Erro ao alterar o email.';
            }
        });
    }

    changeAddress() {
        if(!this.newAddress) {
            this.message = 'Por favor, insira um endereço válido.';
            return;
        }

        this.usuarioService.updateEndereco(this.newAddress).subscribe({
            next: (response) => {
                this.message = 'Endereço alterado com sucesso!';
            },
            error: (err) => {
                this.message = 'Erro ao alterar o endereço.';
            }
        });
    }
}
