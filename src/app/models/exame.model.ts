export class Exame {
    momento: Date;
    resultado: string;
    tipo: string;
    anotacao: string;
    pacienteId: number;
    profissionalId: number;

    constructor(
        momento: Date,
        resultado: string,
        tipo: string,
        anotacao: string,
        pacienteId: number,
        profissionalId: number
    ) {
        this.momento = momento;
        this.resultado = resultado;
        this.tipo = tipo;
        this.anotacao = anotacao;
        this.pacienteId = pacienteId;
        this.profissionalId = profissionalId;
    }
}