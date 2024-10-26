import { CommonModule,NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { AdministradorService } from '../../../services/administrador.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
    selector: 'app-administrador-form',
    standalone: true,
    templateUrl: './administrador-form.component.html',
    styleUrls: ['./administrador-form.component.css'],
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, MatSelectModule, CommonModule,HeaderComponent,FooterComponent]
})
export class AdministradorFormComponent implements OnInit {
    formGroup: FormGroup;
    administradores: any[] = [];
    novelId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private administradorService: AdministradorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            username: [null, Validators.required], 
            email: [null, Validators.required], 
            senha: [null, Validators.required], 
            cpf: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.administradorService.findAll().subscribe((data) => (this.administradores = data));
        this.activatedRoute.params.subscribe(params => {
            this.novelId = params['id'] ? +params['id'] : null;
            if (this.novelId) {
                this.loadNovel(this.novelId);
            }
        });
        
    }

    initializeForm(): void {
        const novel = this.activatedRoute.snapshot.data['novel'];
        if (novel) {
            this.formGroup.patchValue(novel);
        }
    }
    loadNovel(id: number): void {
        this.administradorService.findById(id).subscribe(novel => {
            this.formGroup.patchValue(novel);
        });
        this.formGroup.markAllAsTouched();
    }

    salvar(): void {
        if (this.formGroup.invalid) {
            console.log(this.formGroup.controls); // Logs each control's status and errors
            this.formGroup.markAllAsTouched(); // Ensure all errors are shown in the UI
            return;
        }
        console.log('Salvar method called'); // Debugging: Log method call
        if (this.formGroup.valid) {
            const novel = this.formGroup.value;
            console.log('Form Data:', novel); // Debugging: Log form data
            if (novel.id) {
                this.administradorService.update(novel).subscribe(() => {
                    alert('Novel atualizado com sucesso!'); // Debugging: Log success
                    console.log('Update successful'); // Debugging: Log success
                    this.router.navigateByUrl('/novels');
                }, error => {
                    alert('Erro ao atualizar o novel!'); // Debugging: Log error
                    console.error('Update error:', error); // Debugging: Log error
                });
            } else {
                this.administradorService.insert(novel).subscribe(() => {
                    alert('Novel cadastrado com sucesso!'); // Debugging: Log success
                    console.log('Insert successful'); // Debugging: Log success
                    this.router.navigateByUrl('/novels');
                }, error => {
                    alert('Erro ao cadastrar o novel!'); // Debugging: Log error
                    console.error('Insert error:', error); // Debugging: Log error
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if (id) {
            this.administradorService.delete(id).subscribe(() => {
                alert('Novel excluído com sucesso!'); // Debugging: Log success
                console.log('Delete successful'); // Debugging: Log success
                this.router.navigateByUrl('/novel');
            }, error => {
                console.error('Delete error:', error); // Debugging: Log error
            });
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.formGroup.get(controlName);
        if (control?.hasError('required')) return `${controlName} é obrigatório.`;
        if (control?.hasError('minlength'))
            return `${controlName} deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
        if (control?.hasError('maxlength'))
            return `${controlName} deve ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
        return '';
    }
    
}