/*DESNECESSÁRIO APÓS A INSTALAÇÃO DO CONSIGN
const express = require('express');

let routes = express.Router();//biblioteca de rotas do express
*/

/*Apenas da meneira feita acima, a vairável routes está visivel apenas nesse arquivo.
  Para resolver o problema e ela ficar visivel para quem a chama, temos que exportá-la
*/
module.exports = (app) => {

    //req-> pedidos feitos ao servidor  res-> respostas do servidor
    app.get('/', (req, res) => {

        res.statusCode = 200;//status da conexão

        //para garantir que o conteúdo exibido na tela é realmente HTMl temos que configurar o cabeçalho  
        res.setHeader('Content-Type', 'text/html');

        res.end('<h3>THE SERVER<h3>'); //essa mensagem será mostrada na tela assim que acessarmos localhost:4000 || 127.0.0.1:4000

    });

};//tudo criado dentro desse arquivo será exportado para quem chamar o arquivo