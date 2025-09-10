import express from 'express';

const routes = (app: any) => {
    app.route('/').get((req, res) => res.send('API Agrosync funcionando!'));

    app.use(express.json(), /*Aqui vai as rotas personalizadas em cada Objeto*/)
}

export default routes;