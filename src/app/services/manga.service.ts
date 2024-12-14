import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manga } from '../models/manga.model';
import { Observable } from 'rxjs';
import { GeneroManga } from '../models/generoManga.model';

@Injectable({
    providedIn: 'root'
})
export class MangaService {
    private baseUrl = 'http://localhost:8000/manga';

    constructor(private httpClient: HttpClient) { }

    uploadImage(id: number, imageUrl: string, imagem: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('imageUrl', imageUrl);
        formData.append('imagem', imagem, imagem.name);
        
        return this.httpClient.patch<Manga>(`${this.baseUrl}/${id}/image/upload`, formData);
    }

    findAll(page?: number,pageSize?: number): Observable<Manga[]> {
        let params = {};
        if(page !== undefined && pageSize !== undefined) {
            params = {
                page: page.toString(),
                pageSize: pageSize.toString()
            }
        }
        return this.httpClient.get<Manga[]>(this.baseUrl,{ params });
    }

    count(): Observable<number> {
        return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }

    findById(id: number): Observable<Manga> {
        return this.httpClient.get<Manga>(`${this.baseUrl}/${id}`);
    }

    findByName(term: string): Observable<Manga[]> {
        return this.httpClient.get<Manga[]>(`${this.baseUrl}/name/${term}`);
    }

    insert(manga: Manga): Observable<Manga> {
        const data = {
            nome: manga.nome,
            idAutor: manga.idAutor,
            genero: manga.genero,
            sinopse: manga.sinopse,
            anoPublicacao: manga.lancamento,
            estoque: manga.estoque,
            preco: manga.preco,
            colorido: manga.color,
            paginas: manga.paginas
        };
        return this.httpClient.post<Manga>(this.baseUrl,data);
    }


    findGeneros():Observable<GeneroManga[]>{
        return this.httpClient.get<GeneroManga[]>(`${this.baseUrl}/generos`);
    }
    update(manga: Manga): Observable<Manga> {
        const data = {
            nome: manga.nome,
            idAutor: manga.idAutor,
            genero: manga.genero,
            sinopse: manga.sinopse,
            anoPublicacao: manga.lancamento,
            estoque: manga.estoque,
            colorido: manga.color,
            preco: manga.preco,
            paginas: manga.paginas
        };
        return this.httpClient.put<Manga>(`${this.baseUrl}/${manga.id}`,data);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }

    toImageUrl(imagem: string): string {
        console.log('Base URL:', this.baseUrl); // Log the base URL
    
        if (!imagem) {
            return 'semimagem.png';  // URL de fallback
        }
    
        const imageUrl = `${this.baseUrl}/image/download/${imagem}`;
        console.log('Constructed image URL:', imageUrl); // Log the final image URL
    
        return imageUrl;
    }
    
}
