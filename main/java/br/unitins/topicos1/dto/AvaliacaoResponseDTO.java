package br.unitins.topicos1.dto;

import br.unitins.topicos1.model.Avaliacao;
import br.unitins.topicos1.model.Cliente;

public record AvaliacaoResponseDTO(Long id, String comentario, Cliente cliente) {
    public static AvaliacaoResponseDTO valueOf(Avaliacao avaliacao) {
        if(avaliacao == null) return null;
        return new AvaliacaoResponseDTO(avaliacao.getId(), avaliacao.getComentario(), avaliacao.getCliente());
    }
}