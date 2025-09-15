import usuarioRepository from "./usuario.repository";
import { UsuarioDTO } from "./usuario.types";

class UsuarioService {
  async criarUsuario(data: UsuarioDTO) {
    // Regras de negócio → impedir duplicação
    const existeEmail = await usuarioRepository.findAll();
    if (existeEmail.some(u => u.email === data.email)) {
      throw new Error("Já existe um usuário com este email");
    }

    const existeDocumento = await usuarioRepository.findAll();
    if (existeDocumento.some(u => u.documento === data.documento)) {
      throw new Error("Já existe um usuário com este documento");
    }

    return usuarioRepository.create(data);
  }

  async listarUsuarios() {
    return usuarioRepository.findAll();
  }

  async buscarUsuario(id: number) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    return usuario;
  }

  async atualizarUsuario(id: number, data: UsuarioDTO) {
    return usuarioRepository.update(id, data);
  }

  async desativarUsuario(id: number) {
    const usuario = await this.buscarUsuario(id);
    usuario.ativo = false;
    return usuarioRepository.update(id, usuario);
  }
}

export default new UsuarioService();
