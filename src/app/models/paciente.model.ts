import { Pessoa } from './pessoa.model';
import { Exame } from './exame.model';
import { Telefone } from './telefone.model';
import { Endereco } from './endereco.model';
import { Condicao } from './condicao.model';

export class Paciente extends Pessoa {
    nomeMae: string;
    anotacao: string;
    dataNascimento: Date;
    cartaoSus: string;
    sexo: boolean;
    dataUltimaConsulta: Date;
    obs: string;
    exames: Exame[] = [];
    condicoes: Condicao[] = [];

    constructor(
        nome: string,
        cpf: string,
        email: string,
        telefone: Telefone,
        endereco: Endereco,
        nomeMae: string,
        anotacao: string,
        dataNascimento: Date,
        cartaoSus: string,
        sexo: boolean,
        dataUltimaConsulta: Date,
        obs: string,
        condicoes: Condicao[]
    ) {
        super(nome,cpf,email,telefone,endereco);
        this.nomeMae = nomeMae;
        this.anotacao = anotacao;
        this.dataNascimento = dataNascimento;
        this.cartaoSus = cartaoSus;
        this.sexo = sexo;
        this.dataUltimaConsulta = dataUltimaConsulta;
        this.obs = obs;
        this.condicoes = condicoes;
    }
}