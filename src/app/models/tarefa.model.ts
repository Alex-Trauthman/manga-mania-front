import { StatusTarefa } from './status-tarefa.model';

export class Tarefa {
    nome: string;
    descricao: string;
    status: StatusTarefa;

    constructor(nome: string,descricao: string,status: StatusTarefa) {
        this.nome = nome;
        this.descricao = descricao;
        this.status = status;
    }

    getDescricao(): string {
        return this.descricao;
    }

    setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    getStatus(): StatusTarefa {
        return this.status;
    }

    setStatus(status: StatusTarefa): void {
        this.status = status;
    }
}