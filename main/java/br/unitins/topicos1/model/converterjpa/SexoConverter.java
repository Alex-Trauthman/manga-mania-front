package br.unitins.topicos1.model.converterjpa;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import br.unitins.topicos1.model.Sexo;

@Converter(autoApply = true)
public class SexoConverter implements AttributeConverter<Sexo, Integer> {
    @Override
    public Integer convertToDatabaseColumn(Sexo sexo) {
        return sexo.getId();
    }

    @Override
    public Sexo convertToEntityAttribute(Integer sexo) {
        return Sexo.valueOf(sexo);
    }
}