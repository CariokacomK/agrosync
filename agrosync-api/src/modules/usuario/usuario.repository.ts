import prisma from "../../infra/database/client";
import { Usuario } from "./usuario.types";

class UsuarioRepository {
  async create(data: Usuario) {
    return prisma.usuario.create({ data: data as any });
  }

  async findAll() {
    return prisma.usuario.findMany({
      include:{
        pessoa: true
      }
    });
  }

  async findById(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email}})
  }

  async update(id: number, data: Usuario) {
    return prisma.usuario.update({ where: { id }, data: data as any });
  }

  async delete(id: number) {
    return prisma.usuario.delete({ where: { id } });
  }
}

export default new UsuarioRepository();
