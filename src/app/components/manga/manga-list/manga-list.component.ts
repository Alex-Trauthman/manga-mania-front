import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangaService } from '../../../services/manga.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
    selector: 'app-manga-list',
    templateUrl: './manga-list.component.html',
    styleUrls: ['./manga-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent,FooterComponent]
})
export class MangaListComponent implements OnInit {
    autores: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(MangaService) private mangaService: MangaService) { }

    ngOnInit(): void {
        this.mangaService.findAll(this.page,this.pageSize).subscribe(
            (data: any[]) => {
                this.autores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar autores',error);
            }
        );
    }
}