import { Routes } from '@angular/router';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { EscritorFormComponent } from './components/escritor/escritor-form/escritor-form.component';
import { EscritorListComponent } from './components/escritor/escritor-list/escritor-list.component';
import { EscritorNovelFormComponent } from './components/escritorNovel/escritorNovel-form/escritorNovel-form.component';
import { EscritorNovelListComponent } from './components/escritorNovel/escritorNovel-list/escritorNovel-list.component';
import { LoginComponent } from './login/login.component';
import { MangaFormComponent } from './components/manga/manga-form/manga-form.component';
import { MangaListComponent } from './components/manga/manga-list/manga-list.component';
import { MangaTableFormComponent } from './components/mangaTable/manga-table-form/manga-table-form.component';
import { MangaTableListComponent } from './components/mangaTable/manga-table-list/manga-table-list.component';
import { TarefaFormComponent } from './components/tarefa/tarefa-form/tarefa-form.component';
import { TarefaListComponent } from './components/tarefa/tarefa-list/tarefa-list.component';

export const routes: Routes = [
    // { path: '',redirectTo: '/login',pathMatch: 'full' },
    { path: 'autor',component: AutorListComponent,title: 'Lista de autores' },
    { path: 'autor/new',component: AutorFormComponent,title: 'Novo autor' },
    { path: 'escritor',component: EscritorListComponent,title: 'Lista de escritores' },
    { path: 'escritor/new',component: EscritorFormComponent,title: 'Novo escritor' },
    { path: 'escritorNovel',component: EscritorNovelListComponent,title: 'Lista de escritores' },
    { path: 'escritorNovel/new',component: EscritorNovelFormComponent,title: 'Novo escritor' },
    { path: 'login',component: LoginComponent },
    { path: 'manga',component: MangaListComponent,title: 'Lista de Mangás' }, 
    { path: 'manga/new',component: MangaFormComponent,title: 'Novo manga' },
    { path: 'manga/table',component: MangaTableListComponent,title: 'Lista de Mangás' }, 
    { path: 'manga/table/new',component: MangaTableFormComponent,title: 'Novo manga' },
    { path: 'tarefas',component: TarefaListComponent },
    { path: 'tarefas/form',component: TarefaFormComponent }
];