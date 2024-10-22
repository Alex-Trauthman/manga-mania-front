package br.unitins.topicos1.service;

import java.util.List;

import br.unitins.topicos1.dto.AvaliacaoDTO;
import br.unitins.topicos1.dto.AvaliacaoResponseDTO;
import jakarta.validation.Valid;

public interface AvaliacaoService {
    public AvaliacaoResponseDTO create(@Valid AvaliacaoDTO avaliacaoDto);
    public void update(Long id, AvaliacaoDTO dto);
    public void deleteById(Long id);
    public List<AvaliacaoResponseDTO> findAll();
    public AvaliacaoResponseDTO findById(Long id);
    public List<AvaliacaoResponseDTO> findByComentario(String comentario);
}