import { GeneroManga } from "./generoManga.model";
import { AutorManga } from "./autorManga.model";

export class Manga {
    id!: number;
    nome!: string;
    sinopse!: string;
    genero!: GeneroManga;
    idAutor!: AutorManga;
    lancamento!: number;
    colorido!: boolean;
    preco!: number;
    estoque!: number;
    paginas!: number;

    constructor(
        id: number,
        nome: string,
        sinopse: string,
        genero: GeneroManga,
        idAutor: AutorManga,
        lancamento: number,
        colorido: boolean,
        preco: number,
        estoque: number,
        paginas: number
    ) {
        this.id = id;
        this.nome = nome;
        this.sinopse = sinopse;
        this.genero = genero;
        this.idAutor = idAutor;
        this.lancamento = lancamento;
        this.colorido = colorido;
        this.preco = preco;
        this.estoque = estoque;
        this.paginas = paginas;
    }
}
