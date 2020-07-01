var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let urlParams = require('./../../inc/urlParams/urlParams');
let MenusDAO = require('./../../inc/dao/MenuDAO');

router.use(adminAuth);

router.use(adminMenu);

router.get('/', (req, res, next) => {

    MenusDAO.getAll().then(menusData => {

        urlParams.getParams(req, {menusData}).then(params => {

            res.render('admin/menus', params);

        });

    });

});

router.post('/', (req, res, next) => {

    res.send(req.body);

});

module.exports = router;