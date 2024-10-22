export enum GeneroManga {
    SHOUNEN = "Shounen",
    SHOUJO = "Shoujo",
    SEINEN = "Seinen",
    JOSEI = "Josei",
    ROMANCE = "Romance",
    FANTASIA = "Fantasia",
    ACAO_AVENTURA = "Ação/Aventura",
    COMEDIA = "Comédia",
    HORROR = "Horror",
    SOBRENATURAL = "Sobrenatural",
    ISEKAI = "Isekai",
    MISTERIO = "Mistério",
    MECHA = "Mecha",
    ESPORTE = "Esporte",
    PSICOLOGICO = "Psicológico",
    KODOMUKE = "Kodomomuke",
}

export const GeneroMangaMap: Record<number,GeneroManga> = {
    1: GeneroManga.SHOUNEN,
    2: GeneroManga.SHOUJO,
    3: GeneroManga.SEINEN,
    4: GeneroManga.JOSEI,
    5: GeneroManga.ROMANCE,
    6: GeneroManga.FANTASIA,
    7: GeneroManga.ACAO_AVENTURA,
    8: GeneroManga.COMEDIA,
    9: GeneroManga.HORROR,
    10: GeneroManga.SOBRENATURAL,
    11: GeneroManga.ISEKAI,
    12: GeneroManga.MISTERIO,
    13: GeneroManga.MECHA,
    14: GeneroManga.ESPORTE,
    15: GeneroManga.PSICOLOGICO,
    16: GeneroManga.KODOMUKE,
};

export function getGeneroMangaById(id: number): GeneroManga {
    const genero = GeneroMangaMap[id];
    if(!genero) {
        throw new Error(`Gênero de mangá não encontrado para o ID fornecido: ${id}`);
    }
    return genero;
}
