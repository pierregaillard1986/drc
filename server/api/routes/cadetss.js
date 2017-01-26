import express from 'express';
import Cadets from '../models/cadets.js';
// import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var cadets = new Cadets();

    router.get('/', cadets.findAll);

    router.get('/:id', cadets.findById);

    router.post('/', cadets.create);

    router.put('/:id', cadets.update);

    router.delete('/:id', cadets.delete);

    app.use('/cadetss', /*Auth.hasAuthorization,*/ router);

};
