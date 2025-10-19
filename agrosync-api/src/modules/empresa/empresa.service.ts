import empresaRepository from "./empresa.repository";
import { Empresa } from "./empresa.types";

class EmpresaService {
  async criarEmpresa(data: Empresa) {
    if(!await this.validarEmpresa(data)) return empresaRepository.create(data);
  }

  async validarEmpresa(data: Empresa) {
    const existeCnpj = await empresaRepository.findByCnpj(data.cnpj);

    if(existeCnpj){
      throw new Error("Já existe uma empresa com este CNPJ");
    }

    return (existeCnpj ? false : true);
  }

  async listarEmpresas() {
    return empresaRepository.findAll();
  }

  async buscarEmpresa(id: number) {
    const empresa = await empresaRepository.findById(id);
    if (!empresa) throw new Error("Empresa não encontrada");
    return empresa;
  }

  async atualizarEmpresa(id: number, data: Empresa) {
    return empresaRepository.update(id, data);
  }

  async desativarEmpresa(id: number) {
    const empresa = await this.buscarEmpresa(id);
  
    empresa.ativa = false;

    return empresaRepository.update(id, empresa);
  }
}

export default new EmpresaService();