import express from "express";
import pessoaRoutes from "./pessoa.routes";
import usuarioRoutes from "./usuario.routes";

const router = express.Router();

// rota de teste inicial
router.get("/", (req, res) => {
  res.send("API Agrosync funcionando!");
});

// rotas de módulos
router.use("/pessoa", pessoaRoutes);
router.use("/usuario", usuarioRoutes);

export default router;
