import express from 'express';
import Benjamins from '../models/benjamins.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var benjamins = new Benjamins();

    router.get('/', benjamins.findAll);

    router.get('/:id', benjamins.findById);

    router.post('/', benjamins.create);

    router.put('/:id', benjamins.update);

    router.delete('/:id', benjamins.delete);

    app.use('/benjaminss', /*Auth.hasAuthorization,*/ router);

};
