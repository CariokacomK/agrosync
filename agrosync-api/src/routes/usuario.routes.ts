import { Router } from "express";
import usuarioController from "../modules/usuario/usuario.controller";
import { validateBody } from "../middlewares/validate";
import { UsuarioSchema } from "../modules/usuario/usuario.schema";

const router = Router();

router.post("/usuario", validateBody(UsuarioSchema), usuarioController.criarUsuario);
router.get("/usuario/:id", usuarioController.buscarUsuario);
router.get("/usuario", usuarioController.listarUsuarios);
router.delete("/usuario/:id", usuarioController.desativarUsuario);
router.patch("/usuario/:id", validateBody(UsuarioSchema), usuarioController.atualizarUsuario);

export default router;
