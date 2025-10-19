import usuarioRepository from "./usuario.repository";
import { Usuario } from "./usuario.types";

class UsuarioService {
  async criarUsuario(data: Usuario) {
    if(!await this.validarUsuario(data)) return usuarioRepository.create(data);
  }

  private async validarUsuario(data: Usuario) {
    const existeEmail = await usuarioRepository.findByEmail(data.email ? data.email : "");

    if (existeEmail) {
      throw new Error("Já existe um usuário com este email");
    }

    return (existeEmail ? false : true);
  }

  async listarUsuarios() {
    return usuarioRepository.findAll();
  }

  async buscarUsuario(id: number) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return usuario;
  }

  async atualizarUsuario(id: number, data: Usuario) {
    return usuarioRepository.update(id, data);
  }

  async desativarUsuario(id: number) {
    const usuario = await this.buscarUsuario(id);
    usuario.ativo = false;
    return usuarioRepository.update(id, usuario);
  }
}

export default new UsuarioService();
