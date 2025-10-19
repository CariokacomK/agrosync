export interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  fantasia?: string | null;
  telefone?: string | null;
  email?: string | null;
  endereco?: number | null;
  data_criacao?: Date | null;
  ativa?: boolean | null;
  data_alteracao?: Date | null;
  usuario_responsavel?: BigInt | null;
}
