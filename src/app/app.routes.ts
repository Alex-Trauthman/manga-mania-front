import { Routes } from '@angular/router';
import { AdministradorFormComponent } from './components/administrador/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './components/administrador/administrador-list/administrador-list.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { AutorFormComponent } from './components/autor/autor-form/autor-form.component';
import { AutorMangaListComponent } from './components/autor/autor-list/autor-list.component';
import { EscritorFormComponent } from './components/escritor/escritor-form/escritor-form.component';
import { EscritorNovelListComponent } from './components/escritor/escritor-list/escritor-list.component';
import { MangaCardListComponent } from './components/manga/manga-card-list/manga-card-list.component';
import { LoginComponent } from './components/login/login.component';
import { MangaFormComponent } from './components/manga/manga-form/manga-form.component';
import { MangaListComponent } from './components/manga/manga-list/manga-list.component';
import { NovelFormComponent } from './components/novel/novel-form/novel-form.component';
import { NovelListComponent } from './components/novel/novel-list/novel-list.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { MangaInfoComponent } from './components/manga/manga-info/manga-info.component';
import { NovelInfoComponent } from './components/novel/novel-info/novel-info.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';

export const routes: Routes = [
    {
        path: '',
        component: UserTemplateComponent,
        title: 'Mangás e Novels',
        children: [
            { path: '',pathMatch: 'full',redirectTo: 'loja' },
            { path: 'loja',component: MangaCardListComponent,title: 'Listagem de produtos' }, 
            { path: 'carrinho',component: CarrinhoComponent,title: 'Carrinho de compras' }, 
            { path: 'login',component: LoginComponent,title: 'Login' }, 
            { path: 'loja/manga/:id',component: MangaInfoComponent,title: 'Mangá' }, 
            { path: 'loja/novel/:id',component: NovelInfoComponent,title: 'Novel' }
        ]
    },
    {
        path: 'login', 
        component: LoginComponent,
        title: 'LOGIN',
    },
    {
        path: 'search/novel', 
        component: UserTemplateComponent,
        title: 'PESQUISA 1',
    },
    {
        path: 'search/novel/:term', 
        component: UserTemplateComponent,
        title: 'PESQUISA 2',
    },
    {
        path: 'admin',
        component: AdminTemplateComponent,
        title: 'Painel de controle',
        children: [
            { path: '',pathMatch: 'full',redirectTo: 'administrador' },
            { path: 'administrador',component: AdministradorListComponent,data: { title: "AdministradorListComponent" } },
            { path: 'administrador/new',component: AdministradorFormComponent,data: { title: "AdministradorFormComponent" } },
            { path: 'administrador/edit/:id',component: AdministradorFormComponent,data: { title: "AdministradorFormComponent" } },
            { path: 'autor',component: AutorMangaListComponent,data: { title: "AutorListComponent" } },
            { path: 'autor/new',component: AutorFormComponent,data: { title: "AutorFormComponent" } },
            { path: 'autor/edit/:id',component: AutorFormComponent,data: { title: "AutorFormComponent" } },
            { path: 'escritor',component: EscritorNovelListComponent,data: { title: "EscritorListComponent" } },
            { path: 'escritor/new',component: EscritorFormComponent,data: { title: "EscritorFormComponent" } },
            { path: 'escritor/edit/:id',component: EscritorFormComponent,data: { title: "EscritorFormComponent" } },
            { path: 'manga',component: MangaListComponent,data: { title: "MangaListComponent" } },
            { path: 'manga/new',component: MangaFormComponent,data: { title: "MangaFormComponent" } },
            { path: 'manga/edit/:id',component: MangaFormComponent,data: { title: "MangaFormComponent" } },
            { path: 'novel',component: NovelListComponent,data: { title: "NovelListComponent" } },
            { path: 'novel/new',component: NovelFormComponent,data: { title: "NovelFormComponent" } },
            { path: 'novel/edit/:id',component: NovelFormComponent,data: { title: "NovelFormComponent" } },
            { path: 'usuario',component: UsuarioListComponent,data: { title: "UsuarioListComponent" } },
            { path: 'usuario/new',component: UsuarioFormComponent,data: { title: "UsuarioFormComponent" } },
            { path: 'usuario/edit/:id',component: UsuarioFormComponent,data: { title: "UsuarioFormComponent" } }

        ]
    }
]