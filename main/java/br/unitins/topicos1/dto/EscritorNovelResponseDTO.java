package br.unitins.topicos1.dto;

import br.unitins.topicos1.model.EscritorNovel;
import br.unitins.topicos1.model.Sexo;

public record EscritorNovelResponseDTO(
        Long id,
        String nome,
        int anoNascimento,
        String nacionalidade,
        Sexo sexo) {

    public static EscritorNovelResponseDTO valueOf(EscritorNovel escritor) {

        return new EscritorNovelResponseDTO(
                escritor.getId(),
                escritor.getNome(),
                escritor.getAnoNascimento(),
                escritor.getNacionalidade(),
                escritor.getSexo()

        );
    }

}
