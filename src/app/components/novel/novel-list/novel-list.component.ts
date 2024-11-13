import { Component,OnInit } from '@angular/core';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';
import { CommonModule,NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-novel-list',
    standalone: true,
    imports: [CommonModule,RouterModule,MatTableModule,MatButtonModule,MatCardModule,MatToolbarModule,HeaderComponent,FooterComponent,NgFor,MatIconModule,HeaderComponent,FooterComponent],
    templateUrl: './novel-list.component.html',
    styleUrls: ['./novel-list.component.css']
})
export class NovelListComponent implements OnInit {
    displayedColumns: string[] = ['id','nome','genero','lancamento','preco','estoque','actions'];
    novels: Novel[] = [];

    constructor(private novelService: NovelService, private router: Router) { }

    ngOnInit(): void {
        this.novelService.findAll().subscribe(data => {
            this.novels = data;
        });
    }

    loadNovels(): void {
        this.novelService.findAll().subscribe((data: Novel[]) => {
            this.novels = data;
        });
    }

    editNovel(id: number): void {
        this.router.navigate(['/novel', id]);
    }

    deleteNovel(id: number): void {
        this.novelService.delete(id).subscribe(() => {
            this.loadNovels();
        });
    }
}
