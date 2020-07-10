var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let urlParams = require('./../../inc/urlParams/urlParams');
let ContactsDAO = require('./../../inc/dao/ContactsDAO');

router.use(adminAuth);

router.use(adminMenu);

router.get('/', (req, res, next) => {

    ContactsDAO.getAll().then(contacts => {

        urlParams.getParams(req, {contacts}).then(params => {

            res.render('admin/contacts', params);

        });

    });

});

router.delete('/:id', (req, res, next) => {

    ContactsDAO.delete(
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