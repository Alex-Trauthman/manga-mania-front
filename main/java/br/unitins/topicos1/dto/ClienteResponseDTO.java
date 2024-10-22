package br.unitins.topicos1.dto;

import br.unitins.topicos1.model.Cliente;
import br.unitins.topicos1.model.Sexo;

public record ClienteResponseDTO(Long id, String nome, String email, String senha, String cpf, String endereco, Sexo sexo) {
    public static ClienteResponseDTO valueOf(Cliente user) {
        if(user == null) return null;
        return new ClienteResponseDTO(user.getId(), user.getNome(), user.getEmail(), user.getSenha(), user.getCpf(), user.getEndereco(), user.getSexo());
    }
}