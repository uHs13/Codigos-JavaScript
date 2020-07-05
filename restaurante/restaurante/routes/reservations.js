var express = require('express');
var router = express.Router();
const ValidateReservations = require('./../inc/validations/ValidateReservations');
const renderReservations = require('../inc/render/renderReservations');
const ReservationsDAO = require('../inc/dao/ReservationsDAO');

router.get('/', (req, res, next) => {

    renderReservations.render(req, res);

});

router.post('/', (req, res, next) => {

    let validate = new ValidateReservations(req.body);

    validate.validate().then((resolve) => {

        ReservationsDAO.save(resolve).then(response => {

            req.body = {};

            renderReservations.render(req, res, null, 'Reserva realizada com sucesso!');

        }, reject => {

            res.send(reject);
            return;

            renderReservations.render(req, res, reject)

        });

    }, (reject) => {

        renderReservations.render(req, res, reject);

    });

});

module.exports = router;