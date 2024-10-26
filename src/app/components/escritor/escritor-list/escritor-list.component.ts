import { Component,OnInit,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscritorNovelService } from '../../../services/escritor.service';
import { HeaderComponent } from '../../../header/header.component';

@Component({
    standalone: true,
    selector: 'app-escritor-list',
    templateUrl: './escritor-list.component.html',
    styleUrls: ['./escritor-list.component.css'],
    imports: [CommonModule,HeaderComponent]
})
export class EscritorListComponent implements OnInit {
    escritores: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(@Inject(EscritorNovelService) private escritorService: EscritorNovelService) { }

    ngOnInit(): void {
        this.escritorService.findAll(this.page,this.pageSize).subscribe(
            (data: any[]) => {
                this.escritores = data;
            },
            (error: any) => {
                console.error('Erro ao buscar escritores',error);
            }
        );
    }
}