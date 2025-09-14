import { Request, Response } from 'express';
import pessoaService from './pessoa.service';

class PessoaController {
    async criarPessoa(req: Request, res: Response) {
        try {
            const pessoa = await pessoaService.criarPessoa(req.body);
            res.status(201).json("Pessoa criada com sucesso");
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async listarPessoas(req: Request, res: Response) {
        try {
            const pessoas = await pessoaService.listarPessoas();
            res.status(200).json(pessoas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async buscarPessoa(req: Request, res: Response) {
        try {
            const pessoa = await pessoaService.buscarPessoa(Number(req.params.id));
            res.status(200).json(pessoa);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }   
    }

    async atualizarPessoa(req: Request, res: Response) {
        try {
            const pessoa = await pessoaService.atualizarPessoa(Number(req.params.id), req.body);
            res.status(200).json(pessoa);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deletarPessoa(req: Request, res: Response) {
        try {
            await pessoaService.deletarPessoa(Number(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new PessoaController();
