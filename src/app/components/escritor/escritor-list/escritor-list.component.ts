import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { EscritorNovel } from '../../../models/escritorNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../template/header/header.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-escritor-novel-list',
    standalone: true,
    templateUrl: './escritor-list.component.html',
    styleUrls: ['./escritor-list.component.css'],
    imports: [MatPaginatorModule,CommonModule,RouterModule,MatTableModule,MatButtonModule,MatCardModule,MatToolbarModule,HeaderComponent,FooterComponent]
})
export class EscritorNovelListComponent implements OnInit {
    displayedColumns: string[] = ['id','nome','anoNascimento','nacionalidade','sexo','actions'];
    escritores: EscritorNovel[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private escritorService: EscritorNovelService,private router: Router) { }

    ngOnInit(): void {
        this.loadEscritores();
    }

    paginar(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this.ngOnInit();
    }

    loadEscritores(): void {
        this.escritorService.findAll().subscribe((data: EscritorNovel[]) => {
            this.escritores = data;
        });
        this.escritorService.count().subscribe(data => {this.totalRecords = data});
    }

    editEscritor(id: number): void {
        this.router.navigate(['admin/escritor/edit',id]);
    }

    deleteEscritor(id: number): void {
        this.escritorService.delete(id).subscribe(() => {
            this.loadEscritores();
        });
    }
}