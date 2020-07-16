var express = require('express');
var router = express.Router();
const ValidateLogin = require('./../../inc/validations/ValidateLogin');
const renderLogin = require('../../inc/render/renderLogin');
const Login = require('../../inc/login/Login');

router.get('/', (req, res, next) => {

    renderLogin.render(req, res);

});

router.post('/', (req, res, next) => {

    let validateLogin = new ValidateLogin(req.body);

    validateLogin.validate().then(resolve => {

        let login = new Login(resolve);

        login.login().then(data => {

            console.log(data);

            req.session.user = data;

            res.redirect('/admin/main');

        }, reject => {

            renderLogin.render(req, res, reject);

        });

    }, reject => {

        renderLogin.render(req, res, reject);

    });

});

router.get('/logout', (req, res, next) => {

    delete req.session.user;

    res.redirect('/admin/');

});

module.exports = router;