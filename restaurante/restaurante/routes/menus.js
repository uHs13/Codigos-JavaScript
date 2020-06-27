var express = require('express');
var router = express.Router();
const Meal = require('./../inc/meal/Meal');

router.get('/', (req, res, next) => {

    Meal.getAll().then(results => {

        res.render('menus', {
            title: 'Restaurante Saboroso !',
            meals: results
        });

    });

});

module.exports = router;