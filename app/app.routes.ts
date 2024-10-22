import { Routes } from '@angular/router';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { EscritorFormComponent } from './components/escritor/escritor-form/escritor-form.component';
import { EscritorListComponent } from './components/escritor/escritor-list/escritor-list.component';
import { EditoraFormComponent } from './components/editora/editora-form/editora-form.component';
import { EditoraListComponent } from './components/editora/editora-list/editora-list.component';
import { MangaFormComponent } from './components/manga/manga-form/manga-form.component';
import { MangaListComponent } from './components/manga/manga-list/manga-list.component';

export const routes: Routes = [
    {path: 'autor/new', component: AutorFormComponent, title: 'Novo autor'},
    {path: 'autor', component: AutorListComponent, title: 'Lista de autores'},
    {path: 'cliente/new', component: ClienteFormComponent, title: 'Novo cliente'},
    {path: 'cliente', component: ClienteListComponent, title: 'Lista de clientes'},
    {path: 'editora/new', component: EditoraFormComponent, title: 'Nova editora'},
    {path: 'editora', component: EditoraListComponent, title: 'Lista de editoras'},
    {path: 'escritor/new', component: EscritorFormComponent, title: 'Novo escritor'},
    {path: 'escritor', component: EscritorListComponent, title: 'Lista de escritores'},
    {path: 'manga/new', component: MangaFormComponent, title: 'Novo manga'},
    {path: 'manga', component: MangaListComponent, title: 'Lista de Mangás'}
];
    