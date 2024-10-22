package br.unitins.topicos1.repository;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import br.unitins.topicos1.model.AutorManga;

@ApplicationScoped
public class AutorMangaRepository implements PanacheRepository<AutorManga> {
    public List<AutorManga> findByName(String name) {
        return find("UPPER(nome) LIKE ?1", "%"+ name.toUpperCase() + "%").list();
    }
    
    public AutorManga findByManga(long mangaId) {
        return find("manga_id = 1", mangaId).firstResult();
    }
    
}
