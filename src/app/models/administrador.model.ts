




export class Administrador {
    username!: string;
    email!: string;
    senha!: string;
    cpf!: string;

    constructor(
        username: string, 
        email: string, 
        senha: string, 
        cpf: string
    ) {
        this.username = username;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
    }
}
