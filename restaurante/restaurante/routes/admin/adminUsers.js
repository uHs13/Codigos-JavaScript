var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let urlParams = require('./../../inc/urlParams/urlParams');
const UsersDAO = require('./../../inc/dao/UserDAO');
let formDataAssign = require('./../../inc/formDataAssign/formDataAssign');
let formidable = require('./../../inc/formidable/formidable');

router.use(adminAuth);

router.use(adminMenu);

router.use(formidable);

router.get('/', (req, res, next) => {

    UsersDAO.getAll(req.session.user).then(usersData => {
  
        urlParams.getParams(req , {usersData}).then(params => {

            res.render('admin/users', params);

        });

    });

});

router.post('/', (req, res, next) => {

    UsersDAO.save(
        formDataAssign.assign(req)
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

router.post('/edit/', (req, res, next) => {

    UsersDAO.edit(
        formDataAssign.assign(req)
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

router.delete('/:id', (req, res, next) => {

    UsersDAO.delete(
        req.params.id
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

module.exports = router;