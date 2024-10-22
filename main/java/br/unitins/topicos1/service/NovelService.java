package br.unitins.topicos1.service;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import br.unitins.topicos1.dto.NovelDTO;
import br.unitins.topicos1.dto.NovelResponseDTO;

@ApplicationScoped
public interface NovelService {
    public NovelResponseDTO create(@Valid NovelDTO novel);
    public void update(long id, @Valid NovelDTO novel);
    public void delete(long id);
    public NovelResponseDTO findById(long id);
    public List<NovelResponseDTO> findByName(String name);
    public List<NovelResponseDTO> findByEscritor(long authorId);
    public List<NovelResponseDTO> findByGenre(int genreId);
    public List<NovelResponseDTO> findAll();
}
