import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../header/header.component';
import { FooterComponent } from '../../../footer/footer.component';

@Component({
    selector: 'app-administrador-form',
    standalone: true,
    imports: [CommonModule,FormsModule,HeaderComponent,FooterComponent],
    templateUrl: './administrador-form.component.html',
    styleUrl: './administrador-form.component.css'
})
export class AdministradorFormComponent {
    administrador: any = {
        username: "", 
        email: "", 
        senha: "", 
        cpf: "", 
    };

    onSubmit() {
        console.log(this.administrador);
    }
}