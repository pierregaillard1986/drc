import express from 'express';
import Juniors from '../models/juniors.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var juniors = new Juniors();

    router.get('/', juniors.findAll);

    router.get('/:id', juniors.findById);

    router.post('/', juniors.create);

    router.put('/:id', juniors.update);

    router.delete('/:id', juniors.delete);

    app.use('/juniorss', /*Auth.hasAuthorization,*/ router);

};
