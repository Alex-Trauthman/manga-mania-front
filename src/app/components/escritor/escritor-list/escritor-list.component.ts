import { Component, ViewChild, AfterViewInit, OnInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { EscritorNovel } from '../../../models/escritorNovel.model';
import { EscritorNovelService } from '../../../services/escritor.service';

@Component({
    standalone: true,
    imports: [MatPaginator, MatSort, MatTableDataSource],
    selector: 'app-escritor-list',
    templateUrl: './escritor-list.component.html',
    styleUrls: ['./escritor-list.component.css'],
})
export class EscritorListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'anoNascimento', 'nacionalidade', 'sexo'];
    dataSource: MatTableDataSource<EscritorNovel>;
    escritores: any[] = [];
    totalRecords = 0;
    pageSize = 2;
    page = 0;
    paginator!: MatPaginator;
    sort!: MatSort;

    constructor(@Inject(EscritorNovelService) private escritorService: EscritorNovelService){
        this.dataSource = new MatTableDataSource<any>();
}

    ngOnInit(): void {
        this.escritorService.findAll(this.page,this.pageSize).subscribe(
            (data: EscritorNovel[]) => {
                this.escritores = data;
                this.dataSource.data = data;
            },
            (error: any) => {
                console.error('Erro ao buscar escritores',error);
            }
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}