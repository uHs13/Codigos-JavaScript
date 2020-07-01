var express = require('express');
var router = express.Router();
const MenuDAO = require('./../inc/dao/MenuDAO');

router.get('/', (req, res, next) => {

    MenuDAO.getAll().then(results => {

        res.render('menus', {
            title: 'Restaurante Saboroso !',
            meals: results
        });

    });

});

module.exports = router;