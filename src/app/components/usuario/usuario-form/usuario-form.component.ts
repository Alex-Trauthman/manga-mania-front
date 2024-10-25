import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './usuario-form.component.html',
    styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
    usuario: any = {
        username: "", 
        email: "", 
        senha: "", 
        cpf: "", 
        endereco: "", 
        listaTelefone: [], 
        sexo: 0
    };

    onSubmit() {
        console.log(this.usuario);
    }
}