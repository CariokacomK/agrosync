import express from 'express';
import pessoaController from '../modules/pessoa/pessoa.controller';
import { validateBody } from '../middlewares/validate';
import { PessoaSchema } from '../modules/pessoa/pessoa.schema';

const router = express.Router();

router.post("/pessoa", validateBody(PessoaSchema),pessoaController.criarPessoa)
router.get("/pessoa/:id", pessoaController.buscarPessoa)
router.get("/pessoa", pessoaController.listarPessoas)
router.delete("/pessoa/:id", pessoaController.desativarPessoa)
router.patch("/pessoa/:id", validateBody(PessoaSchema), pessoaController.atualizarPessoa)

export default router;