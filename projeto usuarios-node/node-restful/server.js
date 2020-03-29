//carregando o módulos
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();

app.use( bodyParser.urlencoded( {extended:false, limit:'20mb'} ) ); 
//todos os dados recebidos via post serão convertidos em json
app.use(bodyParser.json({limit:'20mb'}));
app.use(expressValidator());

//inclua todos os arquivos das pastas routes ( todas as rotas ) e utils dentro do app
consign().include('routes').include('utils').into(app);


app.listen(4000,'127.0.0.1',()=>{

    console.log('The server is working');


});