package br.unitins.topicos1.service;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import br.unitins.topicos1.dto.NovelDTO;
import br.unitins.topicos1.dto.NovelResponseDTO;
import br.unitins.topicos1.model.GeneroNovel;
import br.unitins.topicos1.model.Novel;
import br.unitins.topicos1.repository.EscritorNovelRepository;
import br.unitins.topicos1.repository.NovelRepository;

@ApplicationScoped
public class NovelServiceImpl implements NovelService {
    @Inject
    private NovelRepository novelRepository;

    @Inject
    private EscritorNovelRepository escritorNovelRepository;

    @Override
    @Transactional
    public NovelResponseDTO create(@Valid NovelDTO novel) {
        Novel novelEntity = new Novel();
        novelEntity.setNome(novel.nome());
        novelEntity.setAnoPublicacao(novel.lancamento());
        novelEntity.setEscritorNovel(escritorNovelRepository.findById(novel.idAutor()));
        novelEntity.setGenero(GeneroNovel.valueOf(novel.genero()));
        novelEntity.setSinopse(novel.sinopse());
        novelEntity.setPaginas(novel.paginas());
        novelEntity.setCapitulos(novel.capitulos());
        novelEntity.setPreco(novel.preco());
        novelEntity.setEstoque(novel.estoque());
        
        escritorNovelRepository.findById(novel.idAutor()).getNovels().add(novelEntity);
        novelRepository.persist(novelEntity);

        return NovelResponseDTO.valueOf(novelEntity);

    }

    @Override
    @Transactional
    public void update(long id, @Valid NovelDTO novel) {
        Novel novelEntity = novelRepository.findById(id);
        novelEntity.setNome(novel.nome());
        novelEntity.setAnoPublicacao(novel.lancamento());
        novelEntity.setEscritorNovel(escritorNovelRepository.findById(novel.idAutor()));
        novelEntity.setGenero(GeneroNovel.valueOf(novel.genero()));
        novelEntity.setSinopse(novel.sinopse());
        novelEntity.setPaginas(novel.paginas());
        novelEntity.setCapitulos(novel.capitulos());
        novelEntity.setPreco(novel.preco());
        novelEntity.setEstoque(novel.estoque());
    }

    @Override
    @Transactional
    public void delete(long id) {
        novelRepository.deleteById(id);
    }

    @Override
    public NovelResponseDTO findById(long id) {
        Novel novel = novelRepository.findById(id);
        return NovelResponseDTO.valueOf(novel);
    }

    @Override
    public List<NovelResponseDTO> findByName(String name) {
        return novelRepository.findByName(name).stream().map(NovelResponseDTO::valueOf).toList();
    }

    @Override
    public List<NovelResponseDTO> findByEscritor(long authorId) {
        return novelRepository.findByAuthor(authorId).stream().map(NovelResponseDTO::valueOf).toList();
    }

    @Override
    public List<NovelResponseDTO> findByGenre(int genreId) {
        return novelRepository.findByGenre(GeneroNovel.valueOf(genreId)).stream().map(NovelResponseDTO::valueOf).toList();
    }

    @Override
    public List<NovelResponseDTO> findAll() {
        return novelRepository.findAll().stream().map(NovelResponseDTO::valueOf).toList();
    }


    
}
