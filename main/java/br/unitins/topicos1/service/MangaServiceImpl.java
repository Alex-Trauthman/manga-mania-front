package br.unitins.topicos1.service;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import br.unitins.topicos1.dto.MangaDTO;
import br.unitins.topicos1.dto.MangaResponseDTO;
import br.unitins.topicos1.model.AutorManga;
import br.unitins.topicos1.model.GeneroManga;
import br.unitins.topicos1.model.Manga;
import br.unitins.topicos1.repository.AutorMangaRepository;
import br.unitins.topicos1.repository.MangaRepository;

@ApplicationScoped
public class MangaServiceImpl implements MangaService {

    @Inject
    private MangaRepository mangaRepository;

    @Inject
    private AutorMangaRepository autorMangaRepository;

    @Override
    @Transactional
    public MangaResponseDTO create(MangaDTO manga) {
        Manga mangaEntity = new Manga();
        mangaEntity.setNome(manga.nome());
        mangaEntity.setAnoPublicacao(manga.lancamento());
        mangaEntity.setAutor(autorMangaRepository.findById(manga.idAutor()));
        mangaEntity.setGeneroManga(GeneroManga.valueOf(manga.genero()));
        mangaEntity.setColorido(manga.colorido());
        mangaEntity.setEstoque(manga.estoque());
        mangaEntity.setPreco(manga.preco());
        mangaEntity.setSinopse(manga.sinopse());
        mangaEntity.setPaginas(manga.paginas());
        AutorManga autor = autorMangaRepository.findById(manga.idAutor());
        autor.getMangas().add(mangaEntity);
        
        mangaRepository.persist(mangaEntity);
        return MangaResponseDTO.valueOf(mangaEntity);

    }

    @Override
    @Transactional
    public void update(long id, MangaDTO manga) {
        Manga mangaEntity = mangaRepository.findById(id);
        mangaEntity.setNome(manga.nome());
        mangaEntity.setAnoPublicacao(manga.lancamento());
        mangaEntity.setAutor(autorMangaRepository.findById(manga.idAutor()));
        mangaEntity.setGeneroManga(GeneroManga.valueOf(manga.genero()));
        mangaEntity.setColorido(manga.colorido());
        mangaEntity.setEstoque(manga.estoque());
        mangaEntity.setPreco(manga.preco());
        mangaEntity.setSinopse(manga.sinopse());
        mangaEntity.setPaginas(manga.paginas());
    }

    @Override
    @Transactional
    public void delete(long id) {
        mangaRepository.deleteById(id);
    }

    @Override
    public MangaResponseDTO findById(long id) {
        Manga mangaEntity = mangaRepository.findById(id);
        return MangaResponseDTO.valueOf(mangaEntity);
    }

    @Override
    public List<MangaResponseDTO> findByName(String name) {
        return mangaRepository.findByName(name).stream().map(MangaResponseDTO::valueOf).toList();
    }

    @Override
    public List<MangaResponseDTO> findByAutor(long authorId) {
        return mangaRepository.findByAuthor(authorId).stream().map(MangaResponseDTO::valueOf).toList();
    }

    @Override
    public List<MangaResponseDTO> findByGenre(int genreId) {
        return mangaRepository.findByGenre(GeneroManga.valueOf(genreId)).stream().map(MangaResponseDTO::valueOf).toList();
    }

    @Override
    public List<MangaResponseDTO> findAll() {
        return mangaRepository.findAll().stream().map(MangaResponseDTO::valueOf).toList();
    }
    
    
}
