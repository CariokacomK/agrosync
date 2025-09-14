import prisma from "../../infra/database/client";
import { PessoaDTO } from "./pessoa.types";

class PessoaRepository{
    async create(data: PessoaDTO) {
    return prisma.pessoa.create({ data });
  }

  async findAll() {
    return prisma.pessoa.findMany();
  }

  async findById(id: number) {
    return prisma.pessoa.findUnique({ where: { id } });
  }

  async update(id: number, data: PessoaDTO) {
    return prisma.pessoa.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.pessoa.delete({ where: { id } });
  }
}

export default new PessoaRepository();