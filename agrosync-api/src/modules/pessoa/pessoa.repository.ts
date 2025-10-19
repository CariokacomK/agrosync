import prisma from "../../infra/database/client";
import { Pessoa } from "./pessoa.types";

class PessoaRepository{
    async create(data: Pessoa) {
    return prisma.pessoa.create({ data });
  }

  async findAll() {
    return prisma.pessoa.findMany();
  }

  async findById(id: number) {
    return prisma.pessoa.findUnique({ where: { id } });
  }

  async update(id: number, data: Pessoa) {
    return prisma.pessoa.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.pessoa.delete({ where: { id } });
  }
}

export default new PessoaRepository();