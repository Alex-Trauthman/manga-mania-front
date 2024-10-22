package br.unitins.topicos1.dto;

import br.unitins.topicos1.model.ItemPedido;

public record ItemPedidoResponseDTO(
        Long id,
        Double preco,
        Double desconto,
        Integer quantidade,
        Boolean presente) {
    public static ItemPedidoResponseDTO valueOf(ItemPedido item) {
        return new ItemPedidoResponseDTO(
                item.getId(),
                item.getPreco(),
                item.getDesconto(),
                item.getQuantidade(),
                item.getPresente());
    }
}