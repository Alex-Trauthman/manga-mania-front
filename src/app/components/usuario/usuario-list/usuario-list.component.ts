import { Component, OnInit } from '@angular/core';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'genero', 'lancamento', 'preco', 'estoque', 'acao'];
  novels: Novel[] = []; 

  constructor(private novelService: NovelService) {}

  ngOnInit(): void {
    this.novelService.findAll().subscribe(data => {
      this.novels = data;
    });
  }
}
