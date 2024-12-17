export enum GeneroManga {
    ROMANCE = "Romance",
    FANTASIA = "Fantasia",
    ACAO = "Ação",
    FICCAO_CIENTIFICA = "Ficção Científica",
    MISTERIO = "Mistério",
    DRAMA = "Drama",
    COMEDIA = "Comédia",
    HORROR = "Horror",
    HISTORICO = "Histórico",
    SLICE_OF_LIFE = "Slice of Life"
}

export const GeneroMangaMap: Record<number,GeneroManga> = { // alterar
    1: GeneroManga.ROMANCE,
    2: GeneroManga.FANTASIA,
    3: GeneroManga.ACAO,
    4: GeneroManga.FICCAO_CIENTIFICA,
    5: GeneroManga.MISTERIO,
    6: GeneroManga.DRAMA,
    7: GeneroManga.COMEDIA,
    8: GeneroManga.HORROR,
    9: GeneroManga.HISTORICO,
    10: GeneroManga.SLICE_OF_LIFE
};

export function getGeneroMangaById(id: number): GeneroManga {
    const manga = GeneroMangaMap[id];
    if(!manga) {
        throw new Error(`Mangá inválido: "${id}" não é 1 nem 2.`);
    }
    return manga;
}