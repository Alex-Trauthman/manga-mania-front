import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { GeneroNovel, GeneroNovelMap } from '../../../models/generoNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';
import { NovelService } from '../../../services/novel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs/internal/Observable';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
    selector: 'app-autor-form',
    standalone: true,
    templateUrl: './autor-form.component.html',
    styleUrls: ['./autor-form.component.css'],
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, MatSelectModule, CommonModule,HeaderComponent,FooterComponent]
})
export class AutorFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: any[] = [];
    generos = Object.entries(GeneroNovelMap);
    novelId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private novelService: NovelService,
        private escritorService: EscritorNovelService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            paginas: [null, Validators.required],
            preco: [null, Validators.required],
            sinopse: ['',[Validators.required, Validators.minLength(30)]],
            lancamento: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]], // anoPublicação -> modelo java
            estoque: [null, Validators.required],
            idAutor: [null, Validators.required], // Ensure this matches the service method
            genero: [null, Validators.required],
            capitulos: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.escritorService.findAll().subscribe((data) => (this.autores = data));
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
        this.novelService.findById(id).subscribe(novel => {
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
                this.novelService.update(novel).subscribe(() => {
                    alert('Novel atualizado com sucesso!'); // Debugging: Log success
                    console.log('Update successful'); // Debugging: Log success
                    this.router.navigateByUrl('/novels');
                }, error => {
                    alert('Erro ao atualizar o novel!'); // Debugging: Log error
                    console.error('Update error:', error); // Debugging: Log error
                });
            } else {
                this.novelService.insert(novel).subscribe(() => {
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
            this.novelService.delete(id).subscribe(() => {
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