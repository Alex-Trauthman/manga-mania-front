package br.unitins.topicos1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class ItemPedido extends DefaultEntity {
    private Double preco;
    private Double desconto;
    private Integer quantidade;
    private Boolean presente;

    public ItemPedido() {
    }

    public ItemPedido(Double preco, Double desconto, Integer quantidade, Boolean presente) {
        this.preco = preco;
        this.desconto = desconto;
        this.quantidade = quantidade;
        this.presente = presente;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Double getDesconto() {
        return desconto;
    }

    public void setDesconto(Double desconto) {
        this.desconto = desconto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Boolean getPresente() {
        return presente;
    }

    public void setPresente(Boolean presente) {
        this.presente = presente;
    }

}
