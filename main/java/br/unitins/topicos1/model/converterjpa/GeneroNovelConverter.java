package br.unitins.topicos1.model.converterjpa;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import br.unitins.topicos1.model.GeneroNovel;

@Converter(autoApply = true)
public class GeneroNovelConverter implements AttributeConverter<GeneroNovel, Integer>{
  
    @Override
    public Integer convertToDatabaseColumn(GeneroNovel genero) {
        return genero.getId();
    }

    @Override
    public GeneroNovel convertToEntityAttribute(Integer id) {
        return GeneroNovel.valueOf(id);
    }

}
