package br.unitins.topicos1.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.Email;

@Entity
public class Cliente extends DefaultEntity {
    @Column(length = 80)
    private String nome;
    @Column(length = 60)
    @Email
    private String email;
    @Column(length = 120)
    private String senha;
    @Column(length = 12)
    private String cpf;
    @Column(length = 300)
    private String endereco;
    @Column(length = 12)
    @JoinColumn(name = "id_cliente")
    private Sexo sexo;

    public Cliente() {
    };

    public Cliente(String nome, @Email String email, String senha, String cpf, String endereco, Sexo sexo) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.endereco = endereco;
        this.sexo = sexo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}