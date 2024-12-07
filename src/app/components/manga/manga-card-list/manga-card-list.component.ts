import { Component,OnInit,signal } from '@angular/core';
import { Manga } from '../../../models/manga.model';
import { MangaService } from '../../../services/manga.service';
import { MatCardActions,MatCardContent,MatCardFooter,MatCardModule,MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

type Card = {
    id: number,
    nome: string,
    sinopse: string,
    lancamento: number,
    preco: number,
    imageUrl: string;
}

@Component({
    selector: 'app-manga-card-list',
    standalone: true,
    imports: [MatCardModule,MatButtonModule,NgFor,MatCardActions,MatCardContent,MatCardTitle,MatCardFooter],
    templateUrl: './manga-card-list.component.html',
    styleUrl: './manga-card-list.component.css'
})
export class MangaCardListComponent implements OnInit {
    mangas: Manga[] = [];
    cards = signal<Card[]>([]);
    searchForm: FormGroup;

    constructor(private route: ActivatedRoute,private router: Router,private mangaService: MangaService,private formBuilder: FormBuilder) {
        this.searchForm = this.formBuilder.group({
            query: ['']
        });
    }

    ngOnInit(): void {
        this.loadMangas();
        this.route.queryParams.subscribe(params => {
            if(!params["search"]) return;
            this.mangaService.findByName(params["search"]).subscribe(data => {
                this.mangas = data;
                this.carregarCards();
            });
        });
    }

    loadMangas() {
        this.mangaService.findAll(0,10).subscribe(data => {
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
                imageUrl: this.mangaService.getImagem(manga.nomeImagem)
            })
        });
        this.cards.set(cards);
    }
}