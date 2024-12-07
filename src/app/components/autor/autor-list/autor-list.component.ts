import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AutorManga } from '../../../models/autorManga.model';
import { AutorService } from '../../../services/autorManga.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderAdminComponent } from "../../template/header-admin/header-admin.component";
import { FooterAdminComponent } from "../../template/footer-admin/footer-admin.component";
import { MatIconModule } from '@angular/material/icon';
import { Novel } from '../../../models/novel.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-autor-manga-list',
    standalone: true,
    templateUrl: './autor-list.component.html',
    styleUrls: ['./autor-list.component.css'],
    imports: [MatPaginatorModule,CommonModule,RouterModule,MatTableModule,MatButtonModule,MatCardModule,MatToolbarModule,HeaderAdminComponent,FooterAdminComponent,MatIconModule]
})
export class AutorMangaListComponent implements OnInit {
    displayedColumns: string[] = ['id','nome','anoNascimento','nacionalidade','sexo','actions'];
    autores: AutorManga[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private autorService: AutorService,private router: Router) { }

    ngOnInit(): void {
        this.loadAutores();
    }

    paginar(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this.ngOnInit();
    }

    loadAutores(): void {
        this.autorService.findAll(this.page, this.pageSize).subscribe((data: AutorManga[]) => {
            this.autores = data;
        });
        this.autorService.count().subscribe(data => {this.totalRecords = data});
    }

    editAutor(id: number): void {
        this.router.navigate(['admin/autor/edit',id]);
    }

    deleteAutor(id: number): void {
        this.autorService.delete(id).subscribe(() => {
            this.loadAutores();
        });
    }
}