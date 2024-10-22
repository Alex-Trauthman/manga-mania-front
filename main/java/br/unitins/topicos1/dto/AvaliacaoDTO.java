package br.unitins.topicos1.dto;

import br.unitins.topicos1.model.Cliente;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AvaliacaoDTO(
        @NotBlank(message = "Conteúdo do comentário não pode estar vazio") @Size(min = 5, message = "Comentário pequeno demais.") @Size(max = 512, message = "Comentário grande demais.") String comentario,
        Cliente cliente) {
}