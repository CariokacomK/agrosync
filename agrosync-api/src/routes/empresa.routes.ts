import { Router } from "express";
import { validateBody } from "../middlewares/validate";
import { EmpresaSchema } from "../modules/empresa/empresa.schema";
import empresaController from "../modules/empresa/empresa.controller";

const router = Router();

router.post("/empresa", validateBody(EmpresaSchema), empresaController.criarEmpresa);
router.get("/empresa/:id", empresaController.buscarEmpresa);
router.get("/empresa", empresaController.listarEmpresas);
router.delete("/empresa/:id", empresaController.desativarEmpresa);
router.patch("/empresa/:id", validateBody(EmpresaSchema), empresaController.atualizarEmpresa);

export default router;
