import { Sexo } from "./sexo.model";

export class Editora {
    id!: number;
    nome!: string;
    anoNascimento!: number;
    nacionalidade!: string;
    sexo!: Sexo;

    constructor(
        id: number,
        nome: string,
        anoNascimento: number,
        nacionalidade: string,
        sexo: Sexo
    ) {
        this.id = id;
        this.nome = nome;
        this.anoNascimento = anoNascimento;
        this.nacionalidade = nacionalidade;
        this.sexo = sexo;
    }
}
