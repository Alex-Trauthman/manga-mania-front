import { Usuario } from "./usuario.model";

export class Pedido {
    id!: number;
    usuario!: Usuario;
    // itens!:
    preco!: number;
    // endereco!:
    // tipoPagamento!:
    // estado!:

    constructor(id: number, usuario: Usuario, preco: number) {
        this.id = id;
        this.usuario = usuario;
        // this.itens = itens;
        this.preco = preco;
        // this.endereco = endereco;
        // this.tipoPagamento = tipoPagamento;
        // this.estado = estado;
    }
}