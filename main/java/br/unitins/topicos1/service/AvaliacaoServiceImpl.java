package br.unitins.topicos1.service;

import java.util.List;

import br.unitins.topicos1.dto.AvaliacaoDTO;
import br.unitins.topicos1.dto.AvaliacaoResponseDTO;
import br.unitins.topicos1.model.Avaliacao;
import br.unitins.topicos1.repository.AvaliacaoRepository;
import br.unitins.topicos1.validation.ValidationException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@ApplicationScoped
public class AvaliacaoServiceImpl implements AvaliacaoService {
    @Inject
    public AvaliacaoRepository avaliacaoRepository;

    @Override
    @Transactional
    public AvaliacaoResponseDTO create(@Valid AvaliacaoDTO avaliacaoDto) {
        Avaliacao avaliacaoBanco = new Avaliacao();
        avaliacaoBanco.setComentario(avaliacaoDto.comentario());
        avaliacaoRepository.persist(avaliacaoBanco);
        return AvaliacaoResponseDTO.valueOf(avaliacaoBanco);
    }

    @Override
    @Transactional
    public void update(Long id, AvaliacaoDTO avaliacaoDto) {
        Avaliacao avaliacaoBanco = avaliacaoRepository.findById(id);
        if (avaliacaoBanco == null) {
            throw new ValidationException("id", "Avaliação não existe.");
        }
        avaliacaoBanco.setComentario(avaliacaoDto.comentario());
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        avaliacaoRepository.deleteById(id);
    }

    @Override
    public AvaliacaoResponseDTO findById(Long id) {
        Avaliacao avaliacao = avaliacaoRepository.findById(id);
        if(avaliacao == null) return null;
        return AvaliacaoResponseDTO.valueOf(avaliacao);
    }

    @Override
    public List<AvaliacaoResponseDTO> findAll() {
        return avaliacaoRepository
                .listAll()
                .stream()
                .map(e -> AvaliacaoResponseDTO.valueOf(e)).toList();
    }

    @Override
    public List<AvaliacaoResponseDTO> findByComentario(String comentario) {
        return avaliacaoRepository
                .findByComentario(comentario)
                .stream()
                .map(e -> AvaliacaoResponseDTO.valueOf(e)).toList();
    }
}