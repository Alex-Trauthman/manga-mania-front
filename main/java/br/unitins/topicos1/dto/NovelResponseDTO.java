package br.unitins.topicos1.dto;

import br.unitins.topicos1.model.Novel;

public record NovelResponseDTO(
    Long id,
    String nome,
    String sinopse,
    EscritorNovelResponseDTO idEscritor,
    int lancamento,
    Double preco,
    int estoque,
    int paginas
) {
    public static NovelResponseDTO valueOf(Novel novel){
        return new NovelResponseDTO(
            novel.getId(),
            novel.getNome(),
            novel.getSinopse(),
            EscritorNovelResponseDTO.valueOf(novel.getEscritorNovel()),
            novel.getAnoPublicacao(),
            novel.getPreco(),
            novel.getEstoque(),
            novel.getPaginas()
        );
    }
}
