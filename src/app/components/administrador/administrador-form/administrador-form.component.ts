import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-administrador-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './administrador-form.component.html',
    styleUrl: './administrador-form.component.css'
})
export class AdministradorFormComponent {
    administrador: any = {
        username: "", 
        email: "", 
        senha: "", 
        cpf: "", 
        endereco: "", 
        listaTelefone: [], 
        sexo: 0
    };

    onSubmit() {
        console.log(this.administrador);
    }
}