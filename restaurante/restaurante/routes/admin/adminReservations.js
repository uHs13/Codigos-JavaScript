var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let urlParams = require('./../../inc/urlParams/urlParams');

router.use(adminAuth);

router.use(adminMenu);

router.get('/', (req, res, next) => {

    urlParams.getParams(req, {date: {}}).then(params => {

        res.render('admin/reservations', params);

    });

});

router.post('/', (req, res, next) => {

    res.send(req.body);

});

module.exports = router;