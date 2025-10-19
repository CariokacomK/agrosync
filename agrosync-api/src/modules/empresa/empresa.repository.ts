import prisma from "../../infra/database/client";
import { Empresa } from "./empresa.types";

class EmpresaRepository{
    async create(data: Empresa) {
    return prisma.empresa.create({ data: data as any });
  }

  async findAll() {
    return prisma.empresa.findMany({
      include:{
        usuario: true
      }
    });
  }

  async findById(id: number) {
    return prisma.empresa.findUnique({ where: { id } });
  }

  async findByCnpj(cnpj: string){
    return prisma.empresa.findUnique({ where: { cnpj }})
  }

  async update(id: number, data: Empresa) {
    return prisma.empresa.update({ where: { id }, data: data as any });
  }

  async delete(id: number) {
    return prisma.empresa.delete({ where: { id } });
  }
}

export default new EmpresaRepository();