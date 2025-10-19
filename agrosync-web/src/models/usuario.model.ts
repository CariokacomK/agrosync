import type { IPessoaDTO } from "./pessoa.model";

export interface IUsuarioDTO {
  id?: bigint;
  nome: string;
  email?: string | null;
  ativo?: boolean;
  criado?: Date;
  atualizado?: Date | null;
  pessoa_id: bigint | null;
  tipo_usuario?: bigint | null;

  pessoa?: IPessoaDTO | null;
}