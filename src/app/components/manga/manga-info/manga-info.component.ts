import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { Manga } from '../../../models/manga.model';
import { MangaService } from '../../../services/manga.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../template/header/header.component";
import { FooterComponent } from "../../template/footer/footer.component";
import { MatPaginatorModule,PageEvent } from '@angular/material/paginator';
import { getGeneroMangaById } from '../../../models/generoManga.model';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-manga-info',
    standalone: true,
    templateUrl: './manga-info.component.html',
    styleUrls: ['./manga-info.component.css'],
    imports: [MatPaginatorModule,CommonModule,RouterModule,MatTableModule,MatButtonModule,MatCardModule,MatToolbarModule,HeaderComponent,FooterComponent]
})
export class MangaInfoComponent implements OnInit {
    manga!: Manga;

    constructor(private mangaService: MangaService,private router: Router,private carrinhoService: CarrinhoService,private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.mangaService.findById(parseInt(this.router.url.split("?")[0].split("/")?.pop() ?? "-1")).subscribe((data: Manga) => {
            this.manga = data;
        });
    }

    getGeneroString(id: number): string {
        try {
            return getGeneroMangaById(id);
        } catch(error) {
            console.error(error);
            return 'Gênero desconhecido';
        }
    }

    adicionarAoCarrinho(manga: any) {
        this.showSnackbarTopPosition('Produto adicionado no carinho.');
        this.carrinhoService.adicionar({
            type: 1, 
            id: manga.id,
            nome: manga.nome,
            preco: manga.preco,
            quantidade: 1
        })
    }

    showSnackbarTopPosition(content: any) {
        this.snackBar.open(content,'fechar',{
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center"
        });
    }
}