package br.unitins.topicos1.repository;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import br.unitins.topicos1.model.GeneroNovel;
import br.unitins.topicos1.model.Novel;

@ApplicationScoped
public class NovelRepository implements PanacheRepository<Novel> {
    public List<Novel> findByName(String name) {
        return find("UPPER(nome) LIKE ?1", "%"+ name.toUpperCase() + "%").list();
    }

    public List<Novel> findByAuthor(long authorId) {
        return find("autor_id = 1", authorId).list();
    }

    public List<Novel> findByGenre(GeneroNovel genre) {
        return find("genero = 1", genre).list();
    }
}
