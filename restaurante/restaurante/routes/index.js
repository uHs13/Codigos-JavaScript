var express = require('express');
var router = express.Router();
const MenuDAO = require('./../inc/dao/MenuDAO');

/* GET home page. */
router.get('/', function (req, res, next) {

  MenuDAO.getAll().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso !',
      meals: results
    });

  });

});

module.exports = router;