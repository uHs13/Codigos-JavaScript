var express = require('express');
var router = express.Router();
var sql = require('./../inc/db/db');

/* GET home page. */
router.get('/', function (req, res, next) {

  sql.query(`
  SELECT
  TITLE as title,
  DESCRIPTION as description,
  PRICE as price,
  PHOTO as photo
  FROM TB_MENUS
  ORDER BY TITLE
`, (err, result) => {

    res.render('index', {
      title: 'Restaurante Saboroso !',
      meals: result
    });

  });

});

module.exports = router;
