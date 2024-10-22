package br.unitins.topicos1.dto;

import br.unitins.topicos1.model.AutorManga;
import br.unitins.topicos1.model.Sexo;

public record AutorMangaResponseDTO(
    Long id,
    String nome,
    int anoNascimento,
    String nacionalidade,
    Sexo sexo
    
) {
    
    public static AutorMangaResponseDTO valueOf(AutorManga autor){
        return new AutorMangaResponseDTO(
            autor.getId(),
            autor.getNome(),
            autor.getAnoNascimento(),
            autor.getNacionalidade(),
            autor.getSexo()
            
        );
    }
}
