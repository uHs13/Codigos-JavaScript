var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let urlParams = require('./../../inc/urlParams/urlParams');
let EmailsDAO = require('./../../inc/dao/EmailsDAO');

router.use(adminAuth);

router.use(adminMenu);

router.get('/', (req, res, next) => {

    EmailsDAO.getAll().then(emails => {

        urlParams.getParams(req, {emails}).then(params => {

            res.render('admin/emails', params);

        });

    });

});

router.delete('/:id', (req, res, next) => {

    EmailsDAO.delete(
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