package br.unitins.topicos1.dto;

import jakarta.validation.constraints.Min;

public record ItemPedidoDTO(
        @Min(value = 1) Double preco,
        Double desconto,
        @Min(value = 1) Integer quantidade,
        Boolean presente) {
}