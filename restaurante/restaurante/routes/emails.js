var express = require('express');
var router = express.Router();
const EmailsDAO = require('../inc/dao/EmailsDAO');
const ValidateEmails = require('./../inc/validations/ValidateEmails');
const renderEmails = require('../inc/render/renderEmails');

router.get('/', (req, res, next) => {

    renderEmails.render(req, res);

});

router.post('/', (req, res, next) => {

    let validate = new ValidateEmails(req.body);

    validate.validate().then(data => {

        let emails = new EmailsDAO();

        emails.save(data).then(resolve => {

            req.body = {};

            renderEmails.render(req, res, null, 'Email cadastrado com sucesso!');

        }, reject => {

            renderEmails.render(req, res, reject);

        });

    }, reject => {

        renderEmails.render(req, res, reject);

    });

});

module.exports = router;