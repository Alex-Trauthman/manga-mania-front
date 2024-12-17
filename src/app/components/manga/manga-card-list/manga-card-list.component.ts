import { Component, OnInit, signal } from '@angular/core';
import { Manga } from '../../../models/manga.model';
import { MangaService } from '../../../services/manga.service';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneroManga } from '../../../models/generoManga.model';
import { MatPaginator } from '@angular/material/paginator';

type Card = {
    id: number;
    nome: string;
    sinopse: string;
    lancamento: number;
    preco: number;
    imageUrl: string;
    genero: GeneroManga;
}

@Component({
    selector: 'app-manga-card-list',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, NgFor, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, CommonModule,MatPaginator],
    templateUrl: './manga-card-list.component.html',
    styleUrls: ['./manga-card-list.component.css']
})
export class MangaCardListComponent implements OnInit {
    mangas: Manga[] = [];
    cards = signal<Card[]>([]);
    searchForm: FormGroup;
    totalMangas = 0;
    pageSize = 30;
    pageSizeOptions = [10, 30, 60, 90, 110, 130];
    currentPage = 0;          constructor(
        private route: ActivatedRoute,
        private router: Router,
        private mangaService: MangaService,
        private formBuilder: FormBuilder,
        private carrinhoService: CarrinhoService,
        private snackBar: MatSnackBar
    ) {
        this.searchForm = this.formBuilder.group({
            query: ['']
        });
    }

    ngOnInit(): void {
        this.mangaService.count().subscribe(total => {
            this.totalMangas = total;
            this.loadMangas();
        });

        this.route.queryParams.subscribe(params => {
            if (!params["search"]) return;
            this.mangaService.findByName(params["search"]).subscribe(data => {
                this.mangas = data;
                this.carregarCards();
            });
        });
    }

    loadMangas(page: number = 0) {
        this.mangaService.findAll(page, this.pageSize).subscribe(data => {
            this.mangas = data;
            this.carregarCards();
        });
    }

    verManga(id: number) {
        this.router.navigateByUrl('loja/manga/' + id);
    }

    carregarCards() {
        const cards: Card[] = [];
        this.mangas.forEach(manga => {
            cards.push({
                id: manga.id,
                nome: manga.nome,
                sinopse: manga.sinopse,
                lancamento: manga.lancamento,
                preco: manga.preco,
                genero: manga.genero,
                imageUrl: this.mangaService.toImageUrl(manga.imageUrl)
            });
        });
        this.cards.set(cards);
    }

    adicionarAoCarrinho(card: Card) {
        this.showSnackbarTopPosition('Produto adicionado ao carrinho.');
        this.carrinhoService.adicionar({
            type: 1,
            id: card.id,
            nome: card.nome,
            imageUrl: card.imageUrl ?? "livro.jpg", 
            preco: card.preco,
            quantidade: 1
        });
    }

    showSnackbarTopPosition(content: any) {
        this.snackBar.open(content, 'fechar', {
            duration: 3000,
            verticalPosition: "top",
            horizontalPosition: "center"
        });
    }

    onPageChange(event: any) {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadMangas(this.currentPage);
    }
}
