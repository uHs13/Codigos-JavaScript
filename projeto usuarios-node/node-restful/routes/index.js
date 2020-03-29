//CONFIGURAÇÃO DE ROTAS
//O consign passa a variável app pra todos os arquivos de rotas
module.exports = (app)=>{

    //Recebemos todas as requisições e respostas
    //app.get('rota',(require,response)=>{...});
    app.get('/',(require,response)=>{

        response.statusCode = 200;
    
        response.setHeader('Content-Type','text/html');
    
        response.end('<h1>WELCOME TO THE SERVER</h1>');
            
    });

};