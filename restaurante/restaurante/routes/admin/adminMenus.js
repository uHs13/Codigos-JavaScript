var express = require('express');
var router = express.Router();
let adminAuth = require('./../../inc/adminAuth/adminAuth');
let adminMenu = require('./../../inc/adminMenu/adminMenu');
let formidable = require('./../../inc/formidable/formidable');
let formDataAssign = require('./../../inc/formDataAssign/formDataAssign');
let urlParams = require('./../../inc/urlParams/urlParams');
let MenusDAO = require('./../../inc/dao/MenusDAO');
let path = require('path');

router.use(adminAuth);

router.use(adminMenu);

router.use(formidable);

router.get('/', (req, res, next) => {

    MenusDAO.getAll().then(menusData => {

        urlParams.getParams(req, {menusData}).then(params => {

            res.render('admin/menus', params);

        });

    });

});

router.post('/', (req, res, next) => {

    req.files.photo.path = path.parse(req.files.photo.path).base;

    MenusDAO.save(
        formDataAssign.assign(req)
    ).then(results => {

        res.send(results);

    }).catch(error => {

        res.send({
            error
        });

    });

});

router.post('/edit', (req, res, next) => {

    (req.files.photo.name)
    ? req.files.photo.path = path.parse(req.files.photo.path).base
    : req.files.photo.path = false;

    MenusDAO.edit(
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

    MenusDAO.delete(
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