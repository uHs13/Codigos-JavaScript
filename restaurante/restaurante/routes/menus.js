var express = require('express');
var router = express.Router();
const MenusDAO = require('./../inc/dao/MenusDAO');

router.get('/', (req, res, next) => {

    MenusDAO.getAll().then(results => {

        res.render('menus', {
            title: 'Restaurante Saboroso !',
            meals: results
        });

    });

});

module.exports = router;