import express from 'express';
import Todo from '../models/poussins.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var poussins = new Todo();

    router.get('/', poussins.findAll);

    router.get('/:id', poussins.findById);

    router.post('/', poussins.create);

    router.put('/:id', poussins.update);

    router.delete('/:id', poussins.delete);

    app.use('/poussinss', /*Auth.hasAuthorization,*/ router);

};
