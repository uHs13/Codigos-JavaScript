var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  Meal.getAll().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso !',
      meals: results
    });

  });

});

module.exports = router;