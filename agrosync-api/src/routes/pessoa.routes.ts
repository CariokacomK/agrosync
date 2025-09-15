import { Router } from "express";
import pessoaController from "../modules/pessoa/pessoa.controller";
import { validateBody } from "../middlewares/validate";
import { PessoaSchema } from "../modules/pessoa/pessoa.schema";

const router = Router();

router.post("/", validateBody(PessoaSchema), pessoaController.criarPessoa);
router.get("/:id", pessoaController.buscarPessoa);
router.get("/", pessoaController.listarPessoas);
router.delete("/:id", pessoaController.desativarPessoa);
router.patch("/:id", validateBody(PessoaSchema), pessoaController.atualizarPessoa);

export default router;
