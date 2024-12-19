import { PagamentoEstado } from "./PagamentoEstado.model";
import { PagamentoTipo } from "./PagamentoTipo.model";
import { Usuario } from "./usuario.model";

export class Pedido {
    id!: number;
    usuario!: Usuario;
    // itens!:
    preco!: number;
    endereco!: string;
    tipoPagamento!: PagamentoTipo;
    estado!: PagamentoEstado;

    constructor(id: number, usuario: Usuario, preco: number, endereco: string, tipoPagamento: PagamentoTipo, estado: PagamentoEstado) {
        this.id = id;
        this.usuario = usuario;
        // this.itens = itens;
        this.preco = preco;
        this.endereco = endereco;
        this.tipoPagamento = tipoPagamento;
        this.estado = estado;
    }
}