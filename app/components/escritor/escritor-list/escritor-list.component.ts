import { Component,OnInit } from '@angular/core';
import { AutorManga } from '../../../models/autorManga.model';
import { EscritorNovelService } from '../../../services/escritorNovel.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-autor-list',
    standalone: true,
    imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
    templateUrl: './escritor-list.component.html',
    styleUrl: './escritor-list.component.css'
})
export class EscritorListComponent implements OnInit {
    autores: AutorManga[] = [];
    displayedColumns: string[] = ['id', 'nome', 'acao'];

    constructor(private escritorService: EscritorNovelService) {}

    ngOnInit(): void {
        this.escritorService.findAll().subscribe(data => { this.autores = data });
    }
}