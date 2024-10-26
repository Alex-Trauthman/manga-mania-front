import { EscritorNovel } from "./escritorNovel.model";
import { GeneroNovel } from "./generoNovel.model";

export class Novel {
    id!: number;
    nome!: string;
    nomeImagem!: string;
    paginas!: number;
    preco!: number;
    sinopse!: string;
    lancamento!: number;
    estoque!: number;
    genero!: GeneroNovel;
    capitulos!: number;
    idEscritor!: EscritorNovel;

    constructor(
        id: number,
        nome: string,
        sinopse: string,
        idEscritor: EscritorNovel,
        lancamento: number,
        preco: number,
        estoque: number,
        paginas: number,
        genero: GeneroNovel,
        capitulos: number
    ) {
        this.id = id;
        this.nome = nome;
        this.sinopse = sinopse;
        this.idEscritor = idEscritor;
        this.lancamento = lancamento;
        this.preco = preco;
        this.estoque = estoque;
        this.paginas = paginas;
        this.genero = genero;
        this.capitulos = capitulos;
    }
}