package br.unitins.topicos1.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class Produtor extends DefaultEntity {
    @Column(length = 40, nullable = false)
    private String nome;

    @Column(length = 10, nullable = false)
    private int anoNascimento;

    @Column(length = 30, nullable = false)
    private String nacionalidade;

    @Column(nullable = false)
    private Sexo sexo;

    public int getAnoNascimento() {
        return anoNascimento;
    }

    public void setAnoNascimento(int anoNascimento) {
        this.anoNascimento = anoNascimento;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
