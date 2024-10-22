export enum Sexo {
    FEMININO = "Feminino",
    MASCULINO = "Masculino",
}

export const SexoMap: Record<number,Sexo> = {
    1: Sexo.FEMININO,
    2: Sexo.MASCULINO,
};

export function getSexoById(id: number): Sexo {
    const sexo = SexoMap[id];
    if(!sexo) {
        throw new Error(`Sexo inválido: "${id}" não é 1 nem 2.`);
    }
    return sexo;
}
