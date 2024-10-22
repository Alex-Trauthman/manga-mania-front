package br.unitins.topicos1.service;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import br.unitins.topicos1.dto.MangaDTO;
import br.unitins.topicos1.dto.MangaResponseDTO;

@ApplicationScoped
public interface MangaService {
    public MangaResponseDTO create( @Valid MangaDTO manga);
    public void update(long id, @Valid MangaDTO manga);
    public void delete(long id);
    public MangaResponseDTO findById(long id);
    public List<MangaResponseDTO> findByName(String name);
    public List<MangaResponseDTO> findByAutor(long authorId);
    public List<MangaResponseDTO> findByGenre(int genreId);
    public List<MangaResponseDTO> findAll();
}
