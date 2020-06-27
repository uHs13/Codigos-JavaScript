var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {

    if (!req.session.views) req.session.views = 0;

    console.log('SESSION', req.session.views++);

    res.render('admin/index', {
        title: 'Administração Saboroso',
        user: 'Ice Manager'
    });

});

module.exports = router;