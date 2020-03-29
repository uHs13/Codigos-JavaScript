var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();


// Creates a JSON client
var client = restify.createJsonClient({
  url: 'http://127.0.0.1:4000' //ip do restful
});


/* GET users listing. */
//usa somente / porque dentro do arquivo app.js foi configurado automaticamente no boilerplate que a rota padrão é /users
router.get('/', function(req, res, next) {
  
  //quando fizermos a solicitação na rota padrão do client server /players
  client.get('/players', function(err, request, response, obj) {
      
    assert.ifError(err);
  
    //joga na tela do client-server
    res.json(obj);

  });

});

router.get('/:cpf', function(req, res, next) {
  

  client.get(`/players/${req.params.cpf}`, function(err, request, response, obj) {
    
    
    assert.ifError(err);
  
    
    res.json(obj);

  });

});

router.put('/:cpf', function(req, res, next) {
  

  client.put(`/players/${req.params.cpf}`, req.body, function(err, request, response, obj) {

      assert.ifError(err);

      res.json(obj);

  });

});

router.delete('/:cpf', function(req, res, next) {
  

  client.del(`/players/${req.params.cpf}`,function(err, request, response, obj) {

      assert.ifError(err);

      res.json(obj);

  });

});

router.post('/', function(req, res, next) {
  
              //(rota,dados_a_inserir,f=>{})
  client.post(`/players/`, req.body, function(err, request, response, obj) {

      assert.ifError(err);

      res.json(obj);

  });

});

module.exports = router;
