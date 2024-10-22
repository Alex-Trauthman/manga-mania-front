package br.unitins.topicos1.model.converterjpa;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import br.unitins.topicos1.model.GeneroManga;

@Converter(autoApply = true)
public class GeneroMangaConverter implements AttributeConverter<GeneroManga, Integer>{
  
    @Override
    public Integer convertToDatabaseColumn(GeneroManga genero) {
        return genero.getId();
    }

    @Override
    public GeneroManga convertToEntityAttribute(Integer id) {
        return GeneroManga.valueOf(id);
    }

}
