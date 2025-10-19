import { z } from "zod";

export const UsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  ativo: z.boolean().optional().default(true),
  pessoa_id: z.string().transform(v => BigInt(v)).optional(),
  tipo_usuario: z.string().transform(v => BigInt(v)).optional()
});

export type Usuario = z.infer<typeof UsuarioSchema>;