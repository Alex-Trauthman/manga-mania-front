import { NgFor } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Editora } from '../../../models/editora.model';
import { getGeneroNovelById } from '../../../models/generoNovel.model';
import { EditoraService } from '../../../services/editora.service';

@Component({
    selector: 'app-editora-list',
    standalone: true,
    imports: [NgFor,MatTableModule,MatToolbarModule,MatIconModule,MatButtonModule,RouterModule],
    templateUrl: './editora-list.component.html',
    styleUrls: ['./editora-list.component.css']
})
export class EditoraListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'acao'];
    editoras: Editora[] = [];

    getGeneroLabel(genero: any): string {
        const generoId = typeof genero === 'object' ? genero.id : genero;
        console.log(`Obtendo gênero para o ID: ${generoId}`);
        return getGeneroNovelById(generoId);
    }

    constructor(private editoraService: EditoraService) { }

    ngOnInit(): void {
        this.editoraService.findAll().subscribe(data => { this.editoras = data });
    }
}
