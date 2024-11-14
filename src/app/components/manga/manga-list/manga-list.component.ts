import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { Manga } from '../../../models/manga.model';
import { MangaService } from '../../../services/manga.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../template/header/header.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-manga-list',
    standalone: true,
    templateUrl: './manga-list.component.html',
    styleUrls: ['./manga-list.component.css'],
    imports: [MatPaginatorModule,CommonModule,RouterModule,MatTableModule,MatButtonModule,MatCardModule,MatToolbarModule,HeaderComponent,FooterComponent]
})
export class MangaListComponent implements OnInit {
    displayedColumns: string[] = ['id','nome','paginas','preco','sinopse','lancamento','estoque','color','idAutor','genero','actions'];
    mangas: Manga[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private mangaService: MangaService,private router: Router) { }

    ngOnInit(): void {
        this.loadMangas();
    }

    paginar(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this.ngOnInit();
    }

    loadMangas(): void {
        this.mangaService.findAll().subscribe((data: Manga[]) => {
            this.mangas = data;
        });
        this.mangaService.count().subscribe(data => {this.totalRecords = data});
    }

    editManga(id: number): void {
        this.router.navigate(['/manga/edit',id]);
    }

    deleteManga(id: number): void {
        this.mangaService.delete(id).subscribe(() => {
            this.loadMangas();
        });
    }
}