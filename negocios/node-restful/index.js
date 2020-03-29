const express = require('express');//carregamos o módulo express 
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
/* DESNECESSÁRIO APÓS A INSTALAÇÃO DO CONSIGN
let routesIndex = require('./routes/index');//importamos o módulo que estamos exportando dentro do index.js
let routesPlayers = require('./routes/players');//importamos o módulo que estamos exportando dentro do index.js
//por padrão o require procura os arquivos dentro do node_modules. Para indicar que ele deve procurar dentro da pasta onde estamos temos que usar ./ e o nome da pasta onde estão os arquivos que exportam os nossos módulos de rotas 
*/

let app = express();

//configuração para permitir passarmos dados via post. Por padrão o express não entende dados passados, logo precisamos instalar e configurar em nossa aplicação o módulo body-parser
app.use(bodyParser.urlencoded({
    extended:false
}));

app.use(bodyParser.json());//todos os dados recebidos via POST são convertidos em json
app.use(expressValidator());
//inclui todos os arquivos criados em routes dentro do app
consign().include('routes').include('utils').into(app);
//todos os dados recebidos via post serão exibidos como json

//retorna um conjunto de informações da aplicação para a variável app

/* DESNECESSÁRIO APÓS A INSTALAÇÃO DO CONSIGN
//configurando as rotas externas ( rotas que criamos)
app.use(routesIndex); 
app.use('/players',routesPlayers);  
*/

//Após configurar e armazenar o servidor na variável app temos que determinar o número da porta, o ip do servidor e uma função de callback que será executada quando o servidor estiver funcionando 

const port = 4000;
const ip = '127.0.0.1';

//porta para os dados, ip do host
app.listen(port, ip, () => {

    console.log(
        `
********************
| SERVIDOR RODANDO |
|IP:${ip}      |
|PORTA:${port}        |
********************
`);

});

//para rodar esse arquivo temos que acessar a pasta node-restful pelo cmd e digitar 'nodemon index'