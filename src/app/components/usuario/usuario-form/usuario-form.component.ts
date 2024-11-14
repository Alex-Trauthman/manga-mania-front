import { CommonModule,NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,ValidationErrors,Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { AdministradorService } from '../../../services/administrador.service';
import { FooterComponent } from '../../template/footer/footer.component';
import { HeaderComponent } from '../../template/header/header.component';
import { SexoMap } from '../../../models/sexo.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.css'],
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, MatSelectModule, CommonModule,HeaderComponent,FooterComponent]
})
export class UsuarioFormComponent implements OnInit {
    formGroup: FormGroup;
    usuarios: any[] = [];
    novelId: number | null = null;
    sexoIds = Object.entries(SexoMap);

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
        this.administradorService.findAll().subscribe((data) => (this.usuarios = data));
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
            this.formGroup.markAllAsTouched();
            return;
        }
        if (this.formGroup.valid) {
            const novel = this.formGroup.value;
            if (novel.id) {
                this.administradorService.update(novel).subscribe(() => {
                    this.router.navigateByUrl('/novels');
                }, error => {
                });
            } else {
                this.administradorService.insert(novel).subscribe(() => {
                    this.router.navigateByUrl('/novels');
                }, error => {
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if (id) {
            this.administradorService.delete(id).subscribe(() => {
                this.router.navigateByUrl('/novel');
            }, error => {
            });
        }
    }

    getErrorMessage(controlName: string,errors: ValidationErrors | null | undefined): string {
        if(!errors) return "";
        for(const errorName in errors) {
            if(errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
                return this.errorMessages[controlName][errorName];
            }
        }
        return "parâmetro inválido";
    }

    tratarErros(errorResponse: HttpErrorResponse) {
        if(errorResponse.status === 400) {
            if(errorResponse.error?.errors) {
                errorResponse.error.errors.forEach((validationError: any) => {
                    const formControl = this.formGroup.get(validationError.fieldName);
                    if(formControl) {
                        formControl.setErrors({ apiError: validationError.message })
                    }
                });
            }
        } else if(errorResponse.status < 400) {
        } else if(errorResponse.status >= 500) {
        }
    }

    errorMessages: {[controlName: string]: {[errorName: string]: string}} = {
        username: {
            required: 'O nome de usuário é obrigatório.',
            minlength: 'O nome de usuário deve conter ao menos 4 letras.', 
            maxlength: 'O nome de usuário deve conter no máximo 80 letras.', 
            apiError: 'API_ERROR'
        }, 
        email: {
            required: 'O email é obrigatório.',
            minlength: 'O email deve conter ao menos 6 letras.', 
            // maxlength: 'O email deve conter no máximo 10 letras.', -> não tem limite
            apiError: 'API_ERROR'
        }, 
        senha: {
            required: 'A senha é obrigatório.',
            minlength: 'A senha deve conter ao menos 6 letras.', 
            // maxlength: 'A senha deve conter no máximo 10 letras.', -> não tem limite
            apiError: 'API_ERROR'
        }, 
        cpf: {
            required: 'O cpf é obrigatório.',
            minlength: 'O cpf deve conter ao menos 10 letras.', 
            // maxlength: 'O cpf deve conter no máximo 10 letras.', -> não tem limite
            apiError: 'API_ERROR'
        }, 
        endereco: {
            required: 'O endereco é obrigatório.',
            minlength: 'O endereco deve conter ao menos 4 letras.', 
            maxlength: 'O endereco deve conter no máximo 80 letras.', 
            apiError: 'API_ERROR'
        }
    }
}