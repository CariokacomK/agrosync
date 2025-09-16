import express from "express";
import pessoaRoutes from "./pessoa.routes";
import usuarioRoutes from "./usuario.routes";

const routes = (app: any) => {
  app.route("/").get((req: any, res: any) => res.send("Api funcionando"));

  app.use(express.json(), pessoaRoutes, usuarioRoutes)
};

export default routes;
