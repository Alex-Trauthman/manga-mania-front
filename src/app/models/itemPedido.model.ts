import { Manga } from "./manga.model"

export  class ItemPedido{
    manga!: Manga;
    preco!: number;
    desconto!: number;
    quantidade!: number
}