package br.unitins.topicos1.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ClienteDTO(
        @NotBlank(message = "Nome não pode ficar vazio.") @Size(min = 4, max = 80, message = "Nome está grande demais.") String nome,
        @NotBlank(message = "Email não pode ficar vazio.") @Size(min = 6, message = "Email está pequeno demais.") @Size(max = 60, message = "Email está grande demais.") @Email String email,
        @NotBlank(message = "Senha não pode ficar vazia.") @Size(min = 6, message = "Senha está pequena demais.") @Size(max = 60, message = "Senha está grande demais.") String senha,
        @NotBlank(message = "CPF não pode ficar vazio.") @Size(min = 10, message = "CPF está pequeno demais.") @Size(max = 12, message = "CPF está grande demais.") String cpf,
        @NotBlank(message = "Endereço não pode ficar vazio.") @Size(min = 4, max = 80, message = "Endereço está grande demais.") String endereco,
        Integer sexo) {
}