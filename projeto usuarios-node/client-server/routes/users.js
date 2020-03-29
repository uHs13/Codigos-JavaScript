var express = require('express');
var restify = require('restify-clients');
//subimos o restify no localhost:3000 (client-server (servidor cliente -> tem esse nome porque ele também consome dados de outro servidor)) e ele consome dados do servidor que está no localhost:4000( node-restful (servidor-restful) )
var assert = require('assert');
var router = express.Router();

//declaramos onde está localizado o servidor que nos fornece dados
var client = restify.createJsonClient({
  
  url: 'http://localhost:4000'//endereço do servidor

});


//declaramos uma rota dentro do nosso servidor-cliente 
//está apenas '/' porque dentro do app.js temos uma padronização das rotas do users, esse arquivo (users.js) já é a chamada das rotas '/users/...' 
router.get('/', function(req, res, next) {
  //retorna dentro do nosso servidor cliente a resposta da requisição feita ao outro servidor ( node-restful )
  //quando chamarmos '/' requisitando essa rota faremos uma requisição à rota /users do servidor restful que nos fornece dados
  client.get('/users', function(err, request, response, obj) {
    //monta o link 'http://localhost:4000/users' e pega os dados

    assert.ifError(err);
    
    //mostramos na tela do servidor-cliente (client-server)  a resposta do servidor-restful (node-restful)
    res.json(obj);
    
  });

});




router.get('/:id', function(req, res, next) {

  //quando chamarmos /:id estamos requisitando a rota /users/id do servidor node-restful
  client.get(`/users/${req.params.id}`, function(err, request, response, obj) {


    assert.ifError(err);
    

    res.json(obj);
    
  });

});


router.put('/:id', function(req, res, next) {

  
  client.put(`/users/${req.params.id}`, req.body ,function(err, request, response, obj) {


    assert.ifError(err);
    

    res.json(obj);
    
  });

});

router.delete('/:id', function(req, res, next) {

  
  client.del(`/users/${req.params.id}`, function(err, request, response, obj) {


    assert.ifError(err);
    

    res.json(obj);
    
  });

});

router.post('/', function(req, res, next) {

  
  client.post(`/users/`, req.body , function(err, request, response, obj) {


    assert.ifError(err);
    

    res.json(obj);
    
  });

});

module.exports = router;
