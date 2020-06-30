var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let urlParams = require('./../../inc/urlParams/urlParams');
const InfoDAO = require('./../../inc/dao/InfoDAO');

router.use(adminAuth);

router.use(adminMenu);

router.get('/', (req, res, next) => {

    InfoDAO.getGeneralInfo(req.session.user).then(generalInfo => {

        urlParams.getParams(req, generalInfo).then(params => {

            res.render('admin/index', params);

        });

    });

});

router.post('/', (req, res, next) => {

    res.send(req.body);

});

module.exports = router;