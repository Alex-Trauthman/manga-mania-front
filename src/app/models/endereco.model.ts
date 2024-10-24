export class Endereco {
    num: number;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;

    constructor(
        num: number,
        complemento: string,
        bairro: string,
        cidade: string,
        estado: string,
        cep: string
    ) {
        this.num = num;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }
}
