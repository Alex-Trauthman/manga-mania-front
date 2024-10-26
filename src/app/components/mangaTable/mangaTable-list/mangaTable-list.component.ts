import { Component,OnInit } from '@angular/core';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-manga-table-list',
    standalone: true,
    imports: [NgFor,MatTableModule,MatToolbarModule,MatIconModule,MatButtonModule,RouterModule],
    templateUrl: './manga-table-list.component.html',
    styleUrls: ['./manga-table-list.component.css']
})
export class MangaTableListComponent implements OnInit {
    displayedColumns: string[] = ['id','nome','genero','lancamento','preco','estoque','acao'];
    novels: Novel[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private novelService: NovelService) { }

    ngOnInit(): void {
        this.novelService.findAll(this.page,this.pageSize).subscribe(data => {
            this.novels = data;
        });
    }
}
