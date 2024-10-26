import { Routes } from '@angular/router';
import { AdministradorFormComponent } from './components/administrador/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './components/administrador/administrador-list/administrador-list.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { EscritorFormComponent } from './components/escritor/escritor-form/escritor-form.component';
import { EscritorListComponent } from './components/escritor/escritor-list/escritor-list.component';
import { LoginComponent } from './login/login.component';
import { MangaFormComponent } from './components/manga/manga-form/manga-form.component';
import { MangaListComponent } from './components/manga/manga-list/manga-list.component';
import { MangaTableFormComponent } from './components/mangaTable/mangaTable-form/mangaTable-form.component';
import { MangaTableListComponent } from './components/mangaTable/mangaTable-list/mangaTable-list.component';
import { NovelFormComponent } from './components/novel/novel-form/novel-form.component';
import { NovelListComponent } from './components/novel/novel-list/novel-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';

export const routes: Routes = [
    { path: '',redirectTo: '/login',pathMatch: 'full' }, 
    { path: 'administrador',component: AdministradorListComponent}, 
    { path: 'administrador/new',component: AdministradorFormComponent}, 
    { path: 'autor',component: AutorListComponent}, 
    { path: 'autor/new',component: AutorFormComponent}, 
    { path: 'escritor',component: EscritorListComponent}, 
    { path: 'escritor/new',component: EscritorFormComponent}, 
    { path: 'escritorTable',component: EscritorListComponent}, 
    { path: 'escritorTable/new',component: EscritorFormComponent}, 
    { path: 'login',component: LoginComponent },
    { path: 'manga',component: MangaListComponent}, 
    { path: 'manga/new',component: MangaFormComponent}, 
    { path: 'mangaTable',component: MangaTableListComponent}, 
    { path: 'mangaTable/new',component: MangaTableFormComponent}, 
    { path: 'novel',component: NovelListComponent}, 
    { path: 'novel/new',component: NovelFormComponent}, 
    { path: 'usuario',component: UsuarioListComponent}, 
    { path: 'usuario/new',component: UsuarioFormComponent}, 
];