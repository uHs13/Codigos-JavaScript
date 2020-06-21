var express = require('express');
var router = express.Router();
var meal = require('./../inc/meal/Meal');
var sql = require('./../inc/db/db');

/* GET home page. */
router.get('/', function (req, res, next) {

    meal.getAll().then(results => {

      res.render('index', {
        title: 'Restaurante Saboroso !',
        meals: results
      });

    });

});

router.get('/contacts', (req, res, next) => {

  res.render('contacts', {
    title: 'Restaurante Saboroso !'
  });

});

router.get('/menus', (req, res, next) => {

  meal.getAll().then(results => {

    res.render('menus', {
      title: 'Restaurante Saboroso !',
      meals: results
    });

  });

});

router.get('/reservations', (req, res, next) => {

  res.render('reservations', {
    title: 'Restaurante Saboroso !'
  });

});

router.get('/services', (req, res, next) => {

  res.render('services', {
    title: 'Restaurante Saboroso !'
  });

});

module.exports = router;