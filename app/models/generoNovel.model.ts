export enum GeneroNovel {
    ROMANCE = 'Romance',
    FANTASIA = 'Fantasia',
    ACAO = 'Ação',
    FICCAO_CIENTIFICA = 'Ficção Científica',
    MISTERIO = 'Mistério',
    DRAMA = 'Drama',
    COMEDIA = 'Comédia',
    HORROR = 'Horror',
    HISTORICO = 'Histórico',
    SLICE_OF_LIFE = 'Slice of Life',
}

const GeneroNovelMap: { [key: number]: GeneroNovel } = {
    1: GeneroNovel.ROMANCE,
    2: GeneroNovel.FANTASIA,
    3: GeneroNovel.ACAO,
    4: GeneroNovel.FICCAO_CIENTIFICA,
    5: GeneroNovel.MISTERIO,
    6: GeneroNovel.DRAMA,
    7: GeneroNovel.COMEDIA,
    8: GeneroNovel.HORROR,
    9: GeneroNovel.HISTORICO,
    10: GeneroNovel.SLICE_OF_LIFE,
};

export function getGeneroNovelById(id: number): string {
    const genero = GeneroNovelMap[id];
    if(!genero) {
        console.error(`Gênero não encontrado para o ID fornecido: ${id}`);
        return 'Desconhecido';
    }
    return genero;
}