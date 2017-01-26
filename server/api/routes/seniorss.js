import express from 'express';
import Seniors from '../models/seniors.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var seniors = new Seniors();

    router.get('/', seniors.findAll);

    router.get('/:id', seniors.findById);

    router.post('/', seniors.create);

    router.put('/:id', seniors.update);

    router.delete('/:id', seniors.delete);

    app.use('/seniorss', /*Auth.hasAuthorization,*/ router);

};
