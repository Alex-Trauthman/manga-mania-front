import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent],
    templateUrl: './usuario-form.component.html',
    styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
    formGroup: FormGroup;
    usuario: any = {
        username: "", 
        email: "", 
        senha: "", 
        cpf: "", 
        endereco: "", 
        listaTelefone: [], 
        sexo: 0
    };

    constructor(private formBuilder: FormBuilder,private usuarioService: UsuarioService,private router: Router) {
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required], 
            email: ['', Validators.required], 
            senha: ['', Validators.required], 
            cpf: [0, Validators.required], 
            endereco: ['', Validators.required], 
            // listaTelefone: ['', Validators.required], 
            sexo: [0, Validators.required], 
        })
    };

    onSubmit() {
        console.log(this.usuario);
    }
}