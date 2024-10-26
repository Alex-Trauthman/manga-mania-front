import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';
import { Router } from '@angular/router';
import { AutorService } from '../../../services/autorManga.service';
import { AdministradorService } from '../../../services/administrador.service';

@Component({
    selector: 'app-administrador-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent,FooterComponent],
    templateUrl: './administrador-form.component.html',
    styleUrl: './administrador-form.component.css'
})
export class AdministradorFormComponent {
    formGroup: FormGroup;
    administrador: any = {
        username: "", 
        email: "", 
        senha: "", 
        cpf: "", 
    };

    constructor(private formBuilder: FormBuilder,private administradorService: AdministradorService,private router: Router) {
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required], 
            email: ['', Validators.required], 
            senha: ['', Validators.required], 
            cpf: ['', Validators.required], 
        })
    };

    onSubmit() {
        console.log(this.administrador);
    }
}