import pessoaRepository from "./pessoa.repository";
import { Pessoa } from "./pessoa.types";

class PessoaService {
    async criarPessoa(data: Pessoa) {
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

  async atualizarPessoa(id: number, data: Pessoa) {
    return pessoaRepository.update(id, data);
  }

  async desativarPessoa(id: number) {
    const pessoa = await this.buscarPessoa(id);
  
    pessoa.ativo = false;

    return pessoaRepository.update(id, pessoa);
  }
}

export default new PessoaService();