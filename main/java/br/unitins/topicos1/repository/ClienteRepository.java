package br.unitins.topicos1.repository;

import java.util.List;

import br.unitins.topicos1.model.Cliente;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ClienteRepository implements PanacheRepository<Cliente> {
    public Cliente findNomeEqual(String nome) {
        return find("nome = ?1", nome).firstResult();
    }

    public List<Cliente> findByNome(String nome) {
        return find("nome LIKE ?1", "%" + nome + "%").list();
    }

    public List<Cliente> findByEmail(String email) {
        return find("email LIKE ?1", "%" + email + "%").list();
    }

    public List<Cliente> findByCpf(String cpf) {
        return find("cpf LIKE ?1", "%" + cpf + "%").list();
    }

    public List<Cliente> findByEndereco(String endereco) {
        return find("endereco LIKE ?1", "%" + endereco + "%").list();
    }

    public Cliente findByNomeAndSenha(String nome, String senha) {
        return find("nome = ?1 AND senha = ?2", nome, senha).firstResult();
    }
}