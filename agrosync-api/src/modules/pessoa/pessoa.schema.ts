import { z } from "zod";

export const PessoaSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    contato: z.string().optional(),
    email: z.email("Emain inválido").optional(),
    tipo_pessoa: z.string().optional(),
})

export type Pessoa = z.infer<typeof PessoaSchema>;