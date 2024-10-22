package br.unitins.topicos1.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NovelDTO(
    @Size(min = 3, max = 40, message = "O nome deve ter entre 3 e 40 caracteres")
    @NotBlank(message = "O nome é obrigatório")
    String nome,
    @Size(min = 30, message = "A sinopse deve ter no mínimo 30 caracteres")
    @NotBlank(message = "A sinopse é obrigatória")
    String sinopse,
    @NotNull(message = "O gênero é obrigatório")
    int genero,
    @NotNull(message = "O id do autor é obrigatório")
    Long idAutor,
    @Size(min = 4, max = 4, message = "O ano de lançamento deve ter 4 caracteres")
    @NotNull(message = "O ano de lançamento é obrigatório")
    int lancamento,
    @NotNull(message = "O preço é obrigatório")
    Double preco,
    @NotNull(message = "O estoque é obrigatório")
    int estoque,
    @NotNull(message = "A quantidade de páginas é obrigatória")
    int paginas,
    @NotNull(message = "O número de capítulos é obrigatório")
    int capitulos    

) {
    
}
