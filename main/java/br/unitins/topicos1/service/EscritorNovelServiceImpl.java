package br.unitins.topicos1.service;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import br.unitins.topicos1.dto.EscritorNovelDTO;
import br.unitins.topicos1.dto.EscritorNovelResponseDTO;
import br.unitins.topicos1.model.EscritorNovel;
import br.unitins.topicos1.model.Sexo;
import br.unitins.topicos1.repository.EscritorNovelRepository;

@ApplicationScoped
public class EscritorNovelServiceImpl implements EscritorNovelService {

    @Inject
    private EscritorNovelRepository escritorNovelRepository;

    @Override
    @Transactional
    public EscritorNovelResponseDTO create( @Valid EscritorNovelDTO escritorNovel) {
        EscritorNovel escNovel = new EscritorNovel();
        escNovel.setNome(escritorNovel.nome());
        escNovel.setAnoNascimento(escritorNovel.anoNascimento());
        escNovel.setNacionalidade(escritorNovel.nacionalidade());
        escNovel.setSexo(Sexo.valueOf(escritorNovel.sexo()));
        escritorNovelRepository.persist(escNovel);
        return EscritorNovelResponseDTO.valueOf(escNovel);
    }

    @Override
    @Transactional
    public void update(long id,@Valid EscritorNovelDTO escritorNovel) {
        EscritorNovel escNovel = escritorNovelRepository.findById(id);
        escNovel.setNome(escritorNovel.nome());
        escNovel.setAnoNascimento(escritorNovel.anoNascimento());
        escNovel.setNacionalidade(escritorNovel.nacionalidade());
        escNovel.setSexo(Sexo.valueOf(escritorNovel.sexo()));
    }

    @Override
    @Transactional
    public void delete(long id) {
        escritorNovelRepository.deleteById(id);
    }

    @Override
    public EscritorNovelResponseDTO findById(long id) {
        EscritorNovel escNovel = escritorNovelRepository.findById(id);
        return EscritorNovelResponseDTO.valueOf(escNovel);
    }

    @Override
    public List<EscritorNovelResponseDTO> findByName(String name) {
        return escritorNovelRepository.findByName(name).stream().map(EscritorNovelResponseDTO::valueOf).toList();
    }

    @Override
    public EscritorNovelResponseDTO findByNovel(long novelId) {
        EscritorNovel escNovel = escritorNovelRepository.findByNovel(novelId);
        return EscritorNovelResponseDTO.valueOf(escNovel);
    }

    @Override
    public List<EscritorNovelResponseDTO> findAll() {
        return escritorNovelRepository.findAll().stream().map(EscritorNovelResponseDTO::valueOf).toList();
    }

}
