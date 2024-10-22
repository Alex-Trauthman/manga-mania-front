package br.unitins.topicos1.service;

import java.util.List;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import br.unitins.topicos1.dto.AutorMangaDTO;
import br.unitins.topicos1.dto.AutorMangaResponseDTO;
import br.unitins.topicos1.model.AutorManga;
import br.unitins.topicos1.model.Sexo;
import br.unitins.topicos1.repository.AutorMangaRepository;

@ApplicationScoped
public class AutorMangaServiceImpl implements AutorMangaService {

    @Inject
    private AutorMangaRepository autorMangaRepository;


	@Override
	@Transactional
	public AutorMangaResponseDTO create(@Valid AutorMangaDTO autorMangaDTO) {
		AutorManga autor = new AutorManga();
        autor.setNome(autorMangaDTO.nome());
        autor.setAnoNascimento(autorMangaDTO.anoNascimento());
        autor.setNacionalidade(autorMangaDTO.nacionalidade());
        autor.setSexo(Sexo.valueOf(autorMangaDTO.sexo()));
        autorMangaRepository.persist(autor);
        return AutorMangaResponseDTO.valueOf(autor);
	}
    
    @Override
	@Transactional
    public void update( long id, @Valid AutorMangaDTO autorMangaDTO) {
        AutorManga autor = autorMangaRepository.findById(id);
        if (autor != null) {
            autor.setNome(autorMangaDTO.nome());
            autor.setAnoNascimento(autorMangaDTO.anoNascimento());
            autor.setNacionalidade(autorMangaDTO.nacionalidade());
            autor.setSexo(Sexo.valueOf(autorMangaDTO.sexo()));
            autorMangaRepository.persist(autor);
        }
        
    }
	@Override
	@Transactional
	public void delete(long id) {
	    autorMangaRepository.deleteById(id);
	}

	@Override
	public AutorMangaResponseDTO findById(long id) {
		AutorManga autor = autorMangaRepository.findById(id);
        if (autor != null) {
            return AutorMangaResponseDTO.valueOf(autor);
        }
        return null;
	}

	@Override
	public List<AutorMangaResponseDTO> findByName(String name) {
		return autorMangaRepository.findByName(name).stream().map(AutorMangaResponseDTO::valueOf).toList();
	}


	@Override
	@Transactional
	public List<AutorMangaResponseDTO> findAll() {
		return autorMangaRepository.findAll().stream().map(AutorMangaResponseDTO::valueOf).toList();
	}

	@Override
	public AutorMangaResponseDTO findByManga(long mangaId) {
		AutorManga autor = autorMangaRepository.findByManga(mangaId);
        return AutorMangaResponseDTO.valueOf(autor);
	}

}
