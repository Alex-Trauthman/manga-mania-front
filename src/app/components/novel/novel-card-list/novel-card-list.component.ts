import { Component,OnInit,signal } from '@angular/core';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';
import { MatCardActions,MatCardContent,MatCardFooter,MatCardModule,MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

type Card = {
    nome: string,
    sinopse: string,
    lancamento: number,
    preco: number,
    capitulos: number
    imageUrl: string;
}

@Component({
    selector: 'app-novel-card-list',
    standalone: true,
    imports: [MatCardModule,MatButtonModule,NgFor,MatCardActions,MatCardContent,MatCardTitle,MatCardFooter],
    templateUrl: './novel-card-list.component.html',
    styleUrl: './novel-card-list.component.css'
})
export class NovelCardListComponent implements OnInit {
    novels: Novel[] = [];
    cards = signal<Card[]>([]);
    searchForm: FormGroup;

    constructor(private novelService: NovelService,private formBuilder: FormBuilder) {
        this.searchForm = this.formBuilder.group({
            query: ['']
        });
    }

    ngOnInit(): void {
        this.loadNovels();
    }

    loadNovels() {
        this.novelService.findAll(0,10).subscribe(data => {
            this.novels = data;
            this.carregarCards();
        })
    }

    carregarCards() {
        const cards: Card[] = [];
        this.novels.forEach(novel => {
            cards.push({
                nome: novel.nome, 
                sinopse: novel.sinopse, 
                lancamento: novel.lancamento, 
                preco: novel.preco, 
                capitulos: novel.capitulos, 
                imageUrl: this.novelService.getImagem(novel.nomeImagem)
            })
        });
        this.cards.set(cards);
    }
}