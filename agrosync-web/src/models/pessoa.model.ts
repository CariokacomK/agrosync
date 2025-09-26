export interface IPessoaDTO{
    id: bigint;
    nome: string | null;
    contato?: string | null;
    email?: string | null;
    tipo_pessoa?: string | null;
    ativo?: boolean;
    criado_em?: Date;
    atualizado_em?: Date;
}