import express from 'express';
import MicrosPoussins from '../models/microsPoussins.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var microsPoussins = new MicrosPoussins();

    router.get('/', microsPoussins.findAll);

    router.get('/:id', microsPoussins.findById);

    router.post('/', microsPoussins.create);

    router.put('/:id', microsPoussins.update);

    router.delete('/:id', microsPoussins.delete);

    app.use('/microsPoussinss', /*Auth.hasAuthorization,*/ router);

};
