import { GeneroManga } from "./generoManga.model";
import { AutorManga } from "./autorManga.model";

export class Manga {
    id!: number;
    nome!: string;
    paginas!: number;
    preco!: number;
    sinopse!: string;
    lancamento!: number;
    estoque!: number;
    color!: string;
    idAutor!: AutorManga;
    genero!: GeneroManga;

    constructor(
        id: number, 
        nome: string, 
        paginas: number, 
        preco: number, 
        sinopse: string, 
        lancamento: number, 
        estoque: number, 
        color: string, 
        idAutor: AutorManga, 
        genero: GeneroManga, 
    ) {
        this.id = id;
        this.nome = nome;
        this.paginas = paginas;
        this.preco = preco;
        this.sinopse = sinopse;
        this.lancamento = lancamento;
        this.estoque = estoque;
        this.color = color;
        this.idAutor = idAutor;
        this.genero = genero;
    }
}