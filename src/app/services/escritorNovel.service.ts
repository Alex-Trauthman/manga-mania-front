import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EscritorNovel } from "../models/escritorNovel.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })

export class EscritorNovelService {
    private baseUrl = "http://localhost:8000/escritorNovel";

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<EscritorNovel[]> {
        return this.httpClient.get<EscritorNovel[]>(this.baseUrl);
    }

    findById(id: number): Observable<EscritorNovel> {
        return this.httpClient.get<EscritorNovel>(`${this.baseUrl}/${id}`);
    }

    insert(escritor: EscritorNovel): Observable<EscritorNovel> {
        const data = {
            nome: escritor.nome,
            anoNascimento: escritor.anoNascimento,
            nacionalidade: escritor.nacionalidade,
            sexo: escritor.sexo
        };
        return this.httpClient.post<EscritorNovel>(this.baseUrl,data);
    }

    update(escritor: EscritorNovel): Observable<EscritorNovel> {
        const data = {
            nome: escritor.nome,
            anoNascimento: escritor.anoNascimento,
            nacionalidade: escritor.nacionalidade,
            sexo: escritor.sexo
        };
        return this.httpClient.put<EscritorNovel>(`${this.baseUrl}/${escritor.id}`,data);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }
}