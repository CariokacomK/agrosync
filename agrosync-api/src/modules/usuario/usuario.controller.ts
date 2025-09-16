import { Request, Response } from "express";
import usuarioService from "./usuario.service";

class UsuarioController {
  async criarUsuario(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.criarUsuario(req.body);
      res.status(201).json({ message: "Usuário criado com sucesso", usuario });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async listarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.listarUsuarios();
      res.status(200).json(usuarios);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async buscarUsuario(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.buscarUsuario(Number(req.params.id));
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async atualizarUsuario(req: Request, res: Response) {
    try {
      const usuario = await usuarioService.atualizarUsuario(Number(req.params.id), req.body);
      res.status(200).json(usuario);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async desativarUsuario(req: Request, res: Response) {
    try {
      await usuarioService.desativarUsuario(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UsuarioController();
