import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovelService } from '../../../services/novel.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-novel-list',
    templateUrl: './novel-list.component.html',
    styleUrls: ['./novel-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent]
})
export class NovelListComponent implements OnInit {
    autores: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(NovelService) private novelService: NovelService) { }

    ngOnInit(): void {
        this.novelService.findAll(this.page,this.pageSize).subscribe(
            (data: any[]) => {
                this.autores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar autores',error);
            }
        );
    }
}