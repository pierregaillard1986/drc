import express from 'express';
import MinisPoussins from '../models/minisPoussins.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var minisPoussins = new MinisPoussins();

    router.get('/', minisPoussins.findAll);

    router.get('/:id', minisPoussins.findById);

    router.post('/', minisPoussins.create);

    router.put('/:id', minisPoussins.update);

    router.delete('/:id', minisPoussins.delete);

    app.use('/minisPoussinss', /*Auth.hasAuthorization,*/ router);

};
