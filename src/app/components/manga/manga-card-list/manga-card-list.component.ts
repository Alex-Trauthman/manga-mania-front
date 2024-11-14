import { Component,OnInit,signal } from '@angular/core';
import { Manga } from '../../../models/manga.model';
import { MangaService } from '../../../services/manga.service';
import { MatCardActions,MatCardContent,MatCardFooter,MatCardModule,MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

type Card = {
    nome: string, 
    sinopse: string, 
    lancamento: number, 
    preco: number, 
    // imageUrl: string;
}

@Component({
    selector: 'app-faixa-card-list',
    standalone: true,
    imports: [MatCardModule,MatButtonModule,NgFor,MatCardActions,MatCardContent,MatCardTitle,MatCardFooter],
    templateUrl: './manga-card-list.component.html',
    styleUrl: './manga-card-list.component.css'
})
export class FaixaCardListComponent implements OnInit {
    mangas: Manga[] = [];
    cards = signal<Card[]>([]);

    constructor(private mangaService: MangaService) {

    }

    ngOnInit(): void {
        this.loadMangas();
    }

    loadMangas() {
        this.mangaService.findAll(0,10).subscribe(data => {
            this.mangas = data;
            this.carregarCards();
        })
    }

    carregarCards() {
        const cards: Card[] = [];
        this.mangas.forEach(manga => {
            cards.push({
                nome: manga.nome, 
                sinopse: manga.sinopse, 
                lancamento: manga.lancamento, 
                preco: manga.preco
                // imageUrl: this.mangaService.getImagem(manga.nomeImagem)
            })
        });
        this.cards.set(cards);
    }
}