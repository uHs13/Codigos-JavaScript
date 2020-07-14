var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let formidable = require('./../../inc/formidable/formidable');
let urlParams = require('./../../inc/urlParams/urlParams');
const ReservationsDAO = require('./../../inc/dao/ReservationsDAO');
let formDataAssign = require('./../../inc/formDataAssign/formDataAssign');
let moment =  require('moment');

router.use(adminAuth);

router.use(adminMenu);

router.use(formidable);

router.get('/', (req, res, next) => {

    ReservationsDAO.getAll(req).then(pagination => {

        urlParams.getParams(
            req,
            {
                reservationsData: pagination.data,
                date :{
                    start: req.query.start,
                    end: req.query.end
                },
                moment,
                links: pagination.links
            }).then(params => {

            res.render('admin/reservations', params);

        });

    });

});

router.post('/', (req, res, next) => {

    ReservationsDAO.save(
        formDataAssign.assign(req)
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

router.post('/edit/', (req, res, next) => {

    ReservationsDAO.edit(
        formDataAssign.assign(req)
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

router.delete('/:id', (req, res, next) => {

    ReservationsDAO.delete(
        req.params.id
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

router.get('/chart', (req, res, next) => {

    ReservationsDAO.delete(
        req.params.id
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

module.exports = router;