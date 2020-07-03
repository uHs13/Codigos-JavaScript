var express = require('express');
var router = express.Router();
const MenusDAO = require('./../inc/dao/MenusDAO');

/* GET home page. */
router.get('/', function (req, res, next) {

  MenusDAO.getAll().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso !',
      meals: results
    });

  });

});

module.exports = router;