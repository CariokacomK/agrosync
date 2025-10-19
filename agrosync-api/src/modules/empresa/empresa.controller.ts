import { Request, Response } from 'express';
import empresaService from './empresa.service';

class EmpresaController {
    async criarEmpresa(req: Request, res: Response) {
        try {
            const empresa = await empresaService.criarEmpresa(req.body);
            res.status(201).json({message: "Empresa criada com sucesso", empresa});
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async listarEmpresas(req: Request, res: Response) {
        try {
            const empresas = await empresaService.listarEmpresas();
            res.status(200).json(empresas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async buscarEmpresa(req: Request, res: Response) {
        try {
            const empresa = await empresaService.buscarEmpresa(Number(req.params.id));
            res.status(200).json(empresa);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }   
    }

    async atualizarEmpresa(req: Request, res: Response) {
        try {
            const empresa = await empresaService.atualizarEmpresa(Number(req.params.id), req.body);
            res.status(200).json(empresa);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async desativarEmpresa(req: Request, res: Response) {
        try {
            await empresaService.desativarEmpresa(Number(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new EmpresaController();
