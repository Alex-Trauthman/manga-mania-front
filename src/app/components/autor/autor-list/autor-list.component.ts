import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutorManga } from '../../../models/autorManga.model';
import { AutorService } from '../../../services/autorManga.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
    selector: 'app-autor-manga-list',
    standalone: true,
    templateUrl: './autor-list.component.html',
    styleUrls: ['./autor-list.component.css'],
    imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatCardModule, MatToolbarModule, HeaderComponent, FooterComponent]
})
export class AutorMangaListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'anoNascimento', 'nacionalidade', 'sexo', 'actions'];
    autores: AutorManga[] = [];

    constructor(private autorService: AutorService, private router: Router) {}

    ngOnInit(): void {
        this.loadAutores();
    }

    loadAutores(): void {
        this.autorService.findAll().subscribe((data: AutorManga[]) => {
            this.autores = data;
        });
    }

    editAutor(id: number): void {
        this.router.navigate(['/autor-manga', id]);
    }

    deleteAutor(id: number): void {
        this.autorService.delete(id).subscribe(() => {
            this.loadAutores();
        });
    }
}