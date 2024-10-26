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
import { GeneroNovelMap } from '../../../models/generoNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { MangaService } from '../../../services/manga.service';

@Component({
    selector: 'app-manga-form',
    standalone: true,
    templateUrl: './manga-form.component.html',
    styleUrls: ['./manga-form.component.css'],
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
        RouterModule, MatSelectModule, CommonModule,HeaderComponent,FooterComponent]
})
export class MangaFormComponent implements OnInit {
    formGroup: FormGroup;
    autores: any[] = [];
    generos = Object.entries(GeneroNovelMap);
    novelId: number | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private mangaService: MangaService,
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
            lancamento: [null, [Validators.required, Validators.min(1000), Validators.max(9999)]],
            estoque: [null, Validators.required],
<<<<<<< HEAD
            idEscritr: [null, Validators.required],
=======
            color: [null, Validators.required], // Atualizado para boolean
            idAutor: [null, Validators.required],
>>>>>>> 21ba5d8bf9e775ebee4f62862ffb57829b241728
            genero: [null, Validators.required],
            capitulos: [null, Validators.required]
        });
    }

    ngOnInit(): void {
<<<<<<< HEAD
        this.escritorService.findAll().subscribe((data) => (this.autores = data));
=======
        this.autorMangaService.findAll().subscribe((data) => (this.autores = data));
>>>>>>> 21ba5d8bf9e775ebee4f62862ffb57829b241728
        this.activatedRoute.params.subscribe(params => {
            this.novelId = params['id'] ? +params['id'] : null;
            if (this.novelId) {
                this.loadNovel(this.novelId);
            }
        });
        
    }

    initializeForm(): void {
        const manga = this.activatedRoute.snapshot.data['manga'];
        if (manga) {
            this.formGroup.patchValue(manga);
        }
    }
    loadNovel(id: number): void {
        this.mangaService.findById(id).subscribe(manga => {
            this.formGroup.patchValue(manga);
        });
        this.formGroup.markAllAsTouched();
    }

    salvar(): void {
        if (this.formGroup.invalid) {
            console.log(this.formGroup.controls);
            this.formGroup.markAllAsTouched();
            return;
        }
        console.log('Salvar method called');
        if (this.formGroup.valid) {
            const manga = this.formGroup.value;
<<<<<<< HEAD
            console.log('Form Data:', manga);
            if (manga.id) {
                this.mangaService.update(manga).subscribe(() => {
                    alert('Novel atualizado com sucesso!');
                    console.log('Update successful');
=======
            console.log('Form Data:', manga); // Debugging: Log form data
            console.log('Genero Value:', manga.genero); // Debugging: Log genero value
            if (manga.id) {
                this.mangaService.update(manga).subscribe(() => {
                    alert('Manga atualizado com sucesso!'); // Debugging: Log success
                    console.log('Update successful'); // Debugging: Log success
>>>>>>> 21ba5d8bf9e775ebee4f62862ffb57829b241728
                    this.router.navigateByUrl('/manga');
                }, error => {
                    alert('Erro ao atualizar o manga!');
                    console.error('Update error:', error);
                });
            } else {
                this.mangaService.insert(manga).subscribe(() => {
<<<<<<< HEAD
                    alert('Novel cadastrado com sucesso!');
                    console.log('Insert successful');
=======
                    alert('Manga cadastrado com sucesso!'); // Debugging: Log success
                    console.log('Insert successful'); // Debugging: Log success
>>>>>>> 21ba5d8bf9e775ebee4f62862ffb57829b241728
                    this.router.navigateByUrl('/manga');
                }, error => {
                    alert('Erro ao cadastrar o manga!');
                    console.error('Insert error:', error);
                });
            }
        }
    }

    excluir(): void {
        const id = this.formGroup.get('id')?.value;
        if (id) {
            this.mangaService.delete(id).subscribe(() => {
                alert('Novel excluído com sucesso!');
                console.log('Delete successful');
                this.router.navigateByUrl('/manga');
            }, error => {
                console.error('Delete error:', error);
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