import { Sexo } from "./sexo.model";
import { Telefone } from "./telefone.model";

export class Usuario {
        username!: string;
        email!: string;
        senha!: string;
        cpf!: string;
        endereco!: string;
        listaTelefone!: Telefone[];
        sexo!: Sexo;

    constructor(
        username: string, 
        email: string, 
        senha: string, 
        cpf: string, 
        endereco: string, 
        listaTelefone: Telefone[], 
        sexo: Sexo, 
    ) {
        this.username = username;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.endereco = endereco;
        this.listaTelefone = listaTelefone;
        this.sexo = sexo;
    }
}
