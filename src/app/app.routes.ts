import { Routes } from '@angular/router';
import { AdministradorFormComponent } from './components/administrador/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './components/administrador/administrador-list/administrador-list.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { AutorListComponent } from './components/autor/autor-list/autor-list.component';
import { EscritorFormComponent } from './components/escritor/escritor-form/escritor-form.component';
import { EscritorListComponent } from './components/escritor/escritor-list/escritor-list.component';
import { EscritorTableFormComponent } from './components/escritorTable/escritorTable-form/escritorTable-form.component';
import { EscritorTableListComponent } from './components/escritorTable/escritorTable-list/escritorTable-list.component';
import { LoginComponent } from './login/login.component';
import { MangaFormComponent } from './components/manga/manga-form/manga-form.component';
import { MangaListComponent } from './components/manga/manga-list/manga-list.component';
import { NovelFormComponent } from './components/novel/novel-form/novel-form.component';
import { NovelListComponent } from './components/novel/novel-list/novel-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';

export const routes: Routes = [
<<<<<<< Updated upstream
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
    { path: 'novel',component: NovelListComponent}, 
    { path: 'novel/new',component: NovelFormComponent}, 
    { path: 'usuario',component: UsuarioListComponent}, 
    { path: 'usuario/new',component: UsuarioFormComponent}, 
=======
    { path: '', redirectTo: '/login', pathMatch: 'full', data: { title: "Portal de autenticação" } },
    { path: 'administrador', component: AdministradorListComponent, data: { title: "" } },
    { path: 'administrador/new', component: AdministradorFormComponent, data: { title: "AdministradorFormComponent" } },
    { path: 'autor', component: AutorListComponent, data: { title: "AutorListComponent" } },
    { path: 'autor/new', component: AutorFormComponent, data: { title: "AutorFormComponent" } },
    { path: 'autor/edit/:id', component: AutorFormComponent, data: { title: "AutorFormComponent" } },
    { path: 'escritor', component: EscritorListComponent, data: { title: "EscritorListComponent" } },
    { path: 'escritor/new', component: EscritorFormComponent, data: { title: "EscritorFormComponent" } },
    { path: 'escritor/edit/:id', component: EscritorFormComponent, data: { title: "EscritorFormComponent" } },
    { path: 'escritorTable', component: EscritorTableListComponent, data: { title: "EscritorTableListComponent" } },
    { path: 'escritorTable/new', component: EscritorTableFormComponent, data: { title: "EscritorTableFormComponent" } },
    { path: 'login', component: LoginComponent, data: { title: "LoginComponent" } },
    { path: 'manga', component: MangaListComponent, data: { title: "MangaListComponent" } },
    { path: 'manga/new', component: MangaFormComponent, data: { title: "MangaFormComponent" } },
    { path: 'manga/edit/:id', component: MangaFormComponent, data: { title: "MangaFormComponent" } },
    { path: 'mangaTable', component: MangaTableListComponent, data: { title: "MangaTableListComponent" } },
    { path: 'mangaTable/new', component: MangaTableFormComponent, data: { title: "MangaTableFormComponent" } },
    { path: 'novel', component: NovelListComponent, data: { title: "NovelListComponent" } },
    { path: 'novel/new', component: NovelFormComponent, data: { title: "NovelFormComponent" } },
    { path: 'novel/edit/:id', component: NovelFormComponent, data: { title: "NovelFormComponent" } },
    { path: 'usuario', component: UsuarioListComponent, data: { title: "UsuarioListComponent" } },
    { path: 'usuario/new', component: UsuarioFormComponent, data: { title: "UsuarioFormComponent" } },
    { path: 'usuario/edit/:id', component: UsuarioFormComponent, data: { title: "UsuarioFormComponent" } }
>>>>>>> Stashed changes
];