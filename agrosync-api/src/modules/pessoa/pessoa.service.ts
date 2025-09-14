import pessoaRepository from "./pessoa.repository";
import { PessoaDTO } from "./pessoa.types";

class PessoaService {
    async criarPessoa(data: PessoaDTO) {
    return pessoaRepository.create(data);
  }

  async listarPessoas() {
    return pessoaRepository.findAll();
  }

  async buscarPessoa(id: number) {
    const pessoa = await pessoaRepository.findById(id);
    if (!pessoa) throw new Error("Pessoa não encontrada");
    return pessoa;
  }

  async atualizarPessoa(id: number, data: PessoaDTO) {
    return pessoaRepository.update(id, data);
  }

  async deletarPessoa(id: number) {
    return pessoaRepository.delete(id);
  }
}

export default new PessoaService();