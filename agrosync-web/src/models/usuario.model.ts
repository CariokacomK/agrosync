export interface IUsuarioDTO {
  id?: bigint;
  nome: string;
  email?: string | null;
  telefone?: string | null;
  ativo?: boolean;
  criado?: Date;
  atualizado?: Date | null;
  pessoa_id: bigint | null;
}