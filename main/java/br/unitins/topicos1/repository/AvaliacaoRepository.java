package br.unitins.topicos1.repository;

import java.util.List;

import br.unitins.topicos1.model.Avaliacao;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AvaliacaoRepository implements PanacheRepository<Avaliacao> {
    public List<Avaliacao> findByComentario(String comentario) {
        return find("comentario LIKE ?1", "%" + comentario + "%").list();
    }
}