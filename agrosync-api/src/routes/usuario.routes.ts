import { Router } from "express";
import usuarioController from "../modules/usuario/usuario.controller";
import { validateBody } from "../middlewares/validate";
import { UsuarioSchema } from "../modules/usuario/usuario.schema";

const router = Router();

router.post("/", validateBody(UsuarioSchema), usuarioController.criarUsuario);
router.get("/:id", usuarioController.buscarUsuario);
router.get("/", usuarioController.listarUsuarios);
router.delete("/:id", usuarioController.desativarUsuario);
router.patch("/:id", validateBody(UsuarioSchema), usuarioController.atualizarUsuario);

export default router;
