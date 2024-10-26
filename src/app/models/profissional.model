import { Pessoa } from './pessoa.model';
import { Exame } from './exame.model';
import { Formacao } from './formacao.model';
import { Telefone } from './telefone.model';
import { Endereco } from './endereco.model';

export class Profissional extends Pessoa {
    senha: string;
    especialidade: string;
    formacao: Formacao;
    exames: Exame[] = [];

    constructor(
        nome: string,
        cpf: string,
        email: string,
        telefone: Telefone,
        endereco: Endereco,
        senha: string,
        especialidade: string,
        formacao: Formacao
    ) {
        super(nome,cpf,email,telefone,endereco);
        this.senha = senha;
        this.especialidade = especialidade;
        this.formacao = formacao;
    }

    getExames(): Exame[] {
        return this.exames;
    }

    setExames(exames: Exame[]): void {
        this.exames = exames;
    }
}