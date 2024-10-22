package br.unitins.topicos1.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EditoraDTO(
        @NotBlank(message = "Nome não pode ficar vazio.") @Size(min = 4, max = 80, message = "Nome está grande demais.") String nome,
        @NotBlank(message = "Email não pode ficar vazio.") @Size(min = 6, message = "Email está pequeno demais.") @Size(max = 60, message = "Email está grande demais.") @Email String email,
        @NotBlank(message = "Endereço não pode ficar vazio.") @Size(min = 4, max = 80, message = "Endereço está grande demais.") String endereco) {
}