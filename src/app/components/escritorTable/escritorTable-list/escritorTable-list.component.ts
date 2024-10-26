import { NgFor } from '@angular/common';
import { Component,Inject,OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule,PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { EscritorNovelService } from '../../../services/escritor.service';
import { EscritorNovel } from '../../../models/escritorNovel.model';

@Component({
    standalone: true,
    selector: 'app-escritor-list',
    imports: [MatPaginatorModule, NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
    templateUrl: './escritor-list.component.html',
    styleUrl: './escritor-list.component.css'
})
export class EscritorListComponent implements OnInit {
    escritores: EscritorNovel[] = [];
    displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(EscritorNovelService) private escritorService: EscritorNovelService) {
    }

    ngOnInit(): void {
        this.escritorService.findAll(this.page, this.pageSize).subscribe(
            data => { this.escritores = data }
        );

        this.escritorService.count().subscribe(
            data => { this.totalRecords = data }
        );

    }

    paginar(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this.ngOnInit();
    }
}