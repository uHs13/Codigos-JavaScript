const http = require('http');//carregamos o módulo http 

//req-> pedidos feitos ao servidor  res-> respostas do servidor
let server = http.createServer((req, res) => {

    //mostra qual url está sendo chamada
    console.log('URL:' + req.url);

    //mostra o método chamado
    console.log('METODO:' + req.method+'\n');//toda vez que acessamos uma rota de consulta de informação o método GET é utilizado por padrão

    //url que o usuário está digitando
    switch (req.url) {

        case '/':

            res.statusCode = 200;//status da conexão
            
            //para garantir que o conteúdo exibido na tela é realmente HTMl temos que configurar o cabeçalho  
            res.setHeader('Content-Type', 'text/html');
           
            res.end('<h3>THE SERVER<h3>');//essa mensagem será mostrada na tela assim que acessarmos localhost:4000 || 127.0.0.1:4000

            break;

        case '/players':

            res.statusCode = 200;
           
            res.setHeader('Content-Type', 'application/json');
           
            //só exibe strings
            res.end(JSON.stringify({

                players:[
                    {
                        name: 'Xavi Hernandez',
                        position: 'midfielder',
                        id: 1

                    }
                ]
                
            }));

    }

});

//Após configurar e armazenar o servidor na variável server temos que determinar o número da porta, o ip do servidor e uma função de callback que será executada quando o servidor estiver funcionando 

const port = 4000;
const ip = '127.0.0.1';

//porta para os dados, ip do host
server.listen(port, ip, () => {

    console.log(
        `
********************
| SERVIDOR RODANDO |
|IP:${ip}      |
|PORTA:${port}        |
********************
`);

});

//para rodar esse arquivo temos que acessar a pasta node-restful pelo cmd e digitar 'node index'