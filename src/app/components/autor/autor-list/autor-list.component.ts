import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorService } from '../../../services/autorManga.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    selector: 'app-autor-list',
    templateUrl: './autor-list.component.html',
    styleUrls: ['./autor-list.component.css'],
    standalone: true,
    imports: [CommonModule,HeaderComponent]
})
export class AutorListComponent implements OnInit {
    autores: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(AutorService) private autorService: AutorService) { }

    ngOnInit(): void {
        this.autorService.findAll(this.page,this.pageSize).subscribe(
            (data: any[]) => {
                this.autores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar autores',error);
            }
        );
    }
}