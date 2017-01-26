import mongoose from 'mongoose';

const benjaminsSchema = new mongoose.Schema({
    description: String
});

let model = mongoose.model('Benjamins', benjaminsSchema);

export default class Benjamins {

    findAll(req, res) {
        model.find({}, (err, benjaminss) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(benjaminss);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, benjamins) => {
            if (err || !benjamins) {
                res.sendStatus(403);
            } else {
                res.json(benjamins);
            }
        });
    }

    create(req, res) {
        model.create({
                description: req.body.description
            },
            (err, benjamins) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(benjamins);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            description: req.body.description
        }, (err, benjamins) => {
            if (err || !benjamins) {
                res.status(500).send(err.message);
            } else {
                res.json(benjamins);
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
