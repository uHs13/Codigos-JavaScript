var express = require('express');
var router = express.Router();
const ValidateReservations = require('./../inc/validations/ValidateReservations');
const Reservations = require('../inc/model/Reservations');
const renderReservations = require('../inc/render/renderReservations');

router.get('/', (req, res, next) => {

    renderReservations.render(req, res);

});

router.post('/', (req, res, next) => {

    let validate = new ValidateReservations(req.body);

    validate.validate().then((resolve) => {

        let reservations = new Reservations(resolve);

        reservations.save().then(response => {

            req.body = {};

            renderReservations.render(req, res, null, 'Reserva realizada com sucesso!');

        }, reject => {

            renderReservations.render(req, res, reject)

        });

    }, (reject) => {

        renderReservations.render(req, res, reject);

    });

});

module.exports = router;