import express from 'express';
import Minimes from '../models/minimes.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var minimes = new Minimes();

    router.get('/', minimes.findAll);

    router.get('/:id', minimes.findById);

    router.post('/', minimes.create);

    router.put('/:id', minimes.update);

    router.delete('/:id', minimes.delete);

    app.use('/minimess', /*Auth.hasAuthorization,*/ router);

};
