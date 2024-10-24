import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusTarefa } from '../models/status-tarefa.model';

@Injectable({
    providedIn: 'root'
})
export class TarefaService {
    private baseUrl = 'http://localhost:8081/tarefas';

    constructor(private httpClient: HttpClient) {
    }
    findAll() {
        return this.httpClient.get(this.baseUrl);
    }
    findById(id: number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }
    insert(tarefa: any) {
        return this.httpClient.post(this.baseUrl,tarefa);
    }
    update(tarefa: any) {
        return this.httpClient.put(this.baseUrl,tarefa);
    }
    delete(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`);
    }
    findByStatus(status: StatusTarefa) {
        return this.httpClient.get(`${this.baseUrl}/search/status/${status}`);
    }

}
