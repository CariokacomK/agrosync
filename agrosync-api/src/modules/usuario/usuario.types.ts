export interface UsuarioDTO {
  id?: bigint;
  nome: string;
  email?: string | null;
  telefone?: string | null;
  documento: string;
  ativo?: boolean;
  criado?: Date;
  atualizado?: Date | null;
}
