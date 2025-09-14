import express from 'express';
import pessoaRoutes from './pessoa.routes';

const routes = (app: any) => {
    app.route('/').get((req: any, res: any) => res.send('API Agrosync funcionando!'));

    app.use(express.json(), pessoaRoutes)
}

export default routes;