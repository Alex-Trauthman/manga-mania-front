import { Manga } from "./manga.model"

export  class ItemPedido{
    idManga!: number;
    manga!: Manga;
    preco!: number;
    desconto!: number;
    quantidade!: number
}