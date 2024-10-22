import { Component,OnInit } from '@angular/core';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { getGeneroNovelById } from '../../../models/generoNovel.model';

@Component({
    selector: 'app-novel-list',
    standalone: true,
    imports: [NgFor,MatTableModule,MatToolbarModule,MatIconModule,MatButtonModule,RouterModule],
    templateUrl: './novel-list.component.html',
    styleUrls: ['./novel-list.component.css']
})
export class NovelListComponent implements OnInit {
    displayedColumns: string[] = ['id','nome','genero','lancamento','preco','estoque','acao'];
    novels: Novel[] = [];

    getGeneroLabel(genero: any): string {
        const generoId = typeof genero === 'object' ? genero.id : genero;
        console.log(`Obtendo gênero para o ID: ${generoId}`);
        return getGeneroNovelById(generoId);
    }

    constructor(private novelService: NovelService) { }

    ngOnInit(): void {
        this.novelService.findAll().subscribe(data => {
            this.novels = data;
        });
    }
}
