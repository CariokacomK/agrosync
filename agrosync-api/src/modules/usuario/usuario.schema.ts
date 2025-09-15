import { z } from "zod";

export const UsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  ativo: z.boolean().optional(),
  documento: z.string().min(5, "Documento é obrigatório"),
  telefone: z.string().optional(),

});

export type UsuarioDTO = z.infer<typeof UsuarioSchema>;
