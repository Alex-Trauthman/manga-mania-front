import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EscritorNovel } from '../../../models/escritorNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-escritor-novel-list',
    standalone: true,
    templateUrl: './escritor-list.component.html',
    styleUrls: ['./escritor-list.component.css'],
    imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatCardModule, MatToolbarModule, HeaderComponent, FooterComponent, MatPaginatorModule]
})
export class EscritorNovelListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'anoNascimento', 'nacionalidade', 'sexo', 'actions'];
    escritores: EscritorNovel[] = [];

    constructor(private escritorService: EscritorNovelService, private router: Router) {}

    ngOnInit(): void {
        this.loadEscritores();
    }

    loadEscritores(): void {
        this.escritorService.findAll().subscribe((data: EscritorNovel[]) => {
            this.escritores = data;
        });
    }

    editEscritor(id: number): void {
        this.router.navigate(['/escritor-novel', id]);
    }

    deleteEscritor(id: number): void {
        this.escritorService.delete(id).subscribe(() => {
            this.loadEscritores();
        });
    }
}