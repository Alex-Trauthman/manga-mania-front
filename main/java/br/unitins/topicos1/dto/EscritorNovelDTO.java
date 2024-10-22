package br.unitins.topicos1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EscritorNovelDTO(
    @Size(min = 3, max = 40, message = "O nome deve ter entre 3 e 40 caracteres")
    @NotBlank(message = "O nome é obrigatório")
    String nome,
    
    int anoNascimento,
    @Size(min = 2, max = 30, message = "A nacionalidade deve ter entre 2 e 30 caracteres")
    @NotBlank(message = "A nacionalidade é obrigatória")
    String nacionalidade,
    @NotNull(message = "O sexo é obrigatório")
    int sexo
) {
}
