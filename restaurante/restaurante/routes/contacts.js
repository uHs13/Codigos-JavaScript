var express = require('express');
var router = express.Router();
const ContactsDAO = require('../inc/dao/ContactsDAO');
const ValidateContacts = require('./../inc/validations/ValidateContacts');
const renderContacts = require('../inc/render/renderContacts');

router.get('/', (req, res, next) => {

    renderContacts.render(req, res);

});

router.post('/', (req, res, next) => {

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

module.exports = router;