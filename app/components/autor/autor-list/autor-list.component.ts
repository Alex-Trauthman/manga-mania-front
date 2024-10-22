import { Component,OnInit } from '@angular/core';
import { AutorManga } from '../../../models/autorManga.model';
import { AutorService } from '../../../services/autorManga.service';
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
    templateUrl: './autor-list.component.html',
    styleUrl: './autor-list.component.css'
})
export class AutorListComponent implements OnInit {
    autores: AutorManga[] = [];
    displayedColumns: string[] = ['id', 'nome', 'acao'];

    constructor(private autorService: AutorService) {}

    ngOnInit(): void {
        this.autorService.findAll().subscribe(data => { this.autores = data });
    }
}