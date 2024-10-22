package br.unitins.topicos1.service;
import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;
import br.unitins.topicos1.dto.EscritorNovelDTO;
import br.unitins.topicos1.dto.EscritorNovelResponseDTO;

@ApplicationScoped
public interface EscritorNovelService {
    public EscritorNovelResponseDTO create(@Valid EscritorNovelDTO escritorNovel);
    public void update(long id,@Valid EscritorNovelDTO escritorNovel);
    public void delete(long id);
    public EscritorNovelResponseDTO findById(long id);
    public List<EscritorNovelResponseDTO> findByName(String name);
    public EscritorNovelResponseDTO findByNovel(long novelId);
    public List<EscritorNovelResponseDTO> findAll();
}
