var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {

    res.render('admin/index', {
        title: 'Administração Saboroso',
        user: 'Ice Manager'
    });

});

router.post('/', (req, res, next) => {

    res.send(req.body);

});

module.exports = router;