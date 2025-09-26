import prisma from "../../infra/database/client";
import { UsuarioDTO } from "./usuario.types";

class UsuarioRepository {
  async create(data: UsuarioDTO) {
    return prisma.usuario.create({ data: data as any });
  }

  async findAll() {
    return prisma.usuario.findMany();
  }

  async findById(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: number, data: UsuarioDTO) {
    return prisma.usuario.update({ where: { id }, data: data as any });
  }

  async delete(id: number) {
    return prisma.usuario.delete({ where: { id } });
  }
}

export default new UsuarioRepository();
