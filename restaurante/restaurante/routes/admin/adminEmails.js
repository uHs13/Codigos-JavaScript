var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');

router.use(adminAuth);

router.use(adminMenu);

router.get('/', (req, res, next) => {

    res.render('admin/emails', {
        title: 'Administração Saboroso',
        user: 'Ice Manager',
        menus: req.menus
    });

});

router.post('/', (req, res, next) => {

    res.send(req.body);

});

module.exports = router;