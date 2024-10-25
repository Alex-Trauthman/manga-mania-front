export class Telefone {
    codigoArea!: string;
    numero!: string;

    constructor(
        codigoArea: string, 
        numero: string
    ) {
        this.codigoArea = codigoArea;
        this.numero = numero;
    }
}