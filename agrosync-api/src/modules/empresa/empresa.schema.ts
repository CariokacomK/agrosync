import { z } from "zod";

export const EmpresaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(14, "CNPJ inválido").max(18, "CNPJ inválido"),
  fantasia: z.string().optional(),
  telefone: z.string().optional(),
  email: z.email("Email inválido").optional(),
  endereco: z.string().transform(v => BigInt(v)).optional(),
  ativo: z.boolean().optional().default(true),
  usuario_responsavel: z.string().transform(v => BigInt(v)).optional()
});

export type Empresa = z.infer<typeof EmpresaSchema>;