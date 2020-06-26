var express = require('express');
var router = express.Router();
const Meal = require('./../inc/meal/Meal');
const ValidateReservations = require('./../inc/validations/ValidateReservations');
const ValidateContacts = require('./../inc/validations/ValidateContacts');
const renderReservations = require('../inc/render/renderReservations');
const Reservations = require('../inc/model/Reservations');
const renderContacts = require('../inc/render/renderContacts');
const ContactsDAO = require('../inc/dao/ContactsDAO');

/* GET home page. */
router.get('/', function (req, res, next) {

  Meal.getAll().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso !',
      meals: results
    });

  });

});

router.get('/contacts', (req, res, next) => {

  renderContacts.render(req, res);

});

router.post('/contacts', (req, res, next) => {

  let validate = new ValidateContacts(req.body);

  validate.validate().then(data => {

    let contacts = new ContactsDAO();

    contacts.save(data).then(resolve => {

      req.body = {};

      renderContacts.render(req, res, null, 'Mensagem enviada com sucesso!');

    }, reject => {

      renderContacts.render(req, res, reject);

    });

  }, reject => {

    renderContacts.render(req, res, reject);

  });

});

router.get('/menus', (req, res, next) => {

  Meal.getAll().then(results => {

    res.render('menus', {
      title: 'Restaurante Saboroso !',
      meals: results
    });

  });

});

router.get('/reservations', (req, res, next) => {

  renderReservations.render(req, res);

});

router.post('/reservations', (req, res, next) => {

  let validate = new ValidateReservations(req.body);

  validate.validate().then((resolve) => {

    let reservations = new Reservations(resolve);

    reservations.save().then(response => {

      req.body = {};

      renderReservations.render(req, res, null, 'Reserva realizada com sucesso!');

    }, reject => {

      renderReservations.render(req, res, reject)

    });

  }, (reject) => {

    renderReservations.render(req, res, reject);

  });

});

router.get('/services', (req, res, next) => {

  res.render('services', {
    title: 'Restaurante Saboroso !'
  });

});

module.exports = router;