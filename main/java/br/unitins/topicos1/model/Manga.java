package br.unitins.topicos1.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Manga extends Produtor {

    @Column(nullable = false)
    private boolean colorido;

    @ManyToOne
    @JoinColumn(name = "autorManga_id")
    private AutorManga autor;

    
    @Column(length = 60, nullable = false)
    private GeneroManga generoManga;

    public boolean isColorido() {
        return colorido;
    }

    public void setColorido(boolean colorido) {
        this.colorido = colorido;
    }

    public GeneroManga getGeneroManga() {
        return generoManga;
    }

    public void setGeneroManga(GeneroManga generoManga) {
        this.generoManga = generoManga;
    }

    public AutorManga getAutor() {
        return autor;
    }

    public void setAutor(AutorManga autor) {
        this.autor = autor;
    }

}
