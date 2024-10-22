package br.unitins.topicos1.service;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import br.unitins.topicos1.dto.AutorMangaDTO;
import br.unitins.topicos1.dto.AutorMangaResponseDTO;

@ApplicationScoped
public interface AutorMangaService {
    public AutorMangaResponseDTO create(@Valid AutorMangaDTO autorManga);
    public void update(long id, @Valid AutorMangaDTO autorManga);
    public void delete(long id);
    public AutorMangaResponseDTO findById(long id);
    public List<AutorMangaResponseDTO> findByName(String name);
    public AutorMangaResponseDTO findByManga(long mangaId);
    public List<AutorMangaResponseDTO> findAll();
} 