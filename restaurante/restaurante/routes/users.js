var express = require('express');
var router = express.Router();
var sql = require('./../inc/db/db');

/* GET users listing. */
router.get('/', function(req, res, next) {

  sql.query(
    'SELECT * FROM TB_USERS',
    (err, results) => {

      res.send(results);

    });

});

module.exports = router;
