let neDB  = require('nedb');

let db = new neDB({

    filename:'users.db',
    autoload:true


});

//O consign passa a variável app pra todos os arquivos de rotas
module.exports = (app)=>{

let route = app.route('/users')

//RETORNA TODOS OS UUSÁRIOS DO BANCO
route.get((require,response)=>{
    
    //db.find(objeto_procurado,callback(error,users)=>{...});
    //sort({atributo:valor})  => 1:crescente ( ascendente ), -1 decrescente
    db.find({}).sort({name:1}).exec((error,users)=>{
    //NÃO PASSAMOS NENHUM USUÁRIO, LOGO SERÃO RETORNADOS TODOS OS DADOS DO BANCO

        if(error){//se der algum erro na hora de procurar
            
            app.utils.error.send(error,require,response);

        } else { // se não der nenhum erro na hora de procurar

            response.statusCode = 200;
   
            response.setHeader('Content-Type','application/json');
           
            response.json({
        
                'users': users
        
            });

        }



    });//fim db.find

});//fim get
 
//GET -> CONSUTA || POST -> CADASTRO || PUT -> ALTERAR DADOS || DELETE -> DELETAR DADOS


//função de callback
//CADASTRO DE USUÁRIO
route.post((require,response)=>{
     
    
    if(!app.utils.validator.user(app,require,response)) return false;
    
    //esse usuario são os dados inseridos dentro do banco ( atributos + id );                   
    //db.insert(objeto_a_ser_inserido,callback(error,user)=>{...});
    //require.body -> dados enviados nos inputs
    db.insert(require.body,(error,user)=>{

        //se ocorrer algum erro na hora de inserir os dados do usuário no banco
        if(error){
            
            app.utils.error.send(error,require,response);

        } else {//se não der erro na hora de inserir o usuário no banco

                                 //variável de callback do db.insert
            response.status(200).json(user);


        }


    });//fim db.insert


});//fim post

let routeId = app.route('/users/:id');  

//CONSULTA DE USUÁRIO
routeId.get((require,response)=>{

    //traz um usuário específico
    db.findOne({_id:require.params.id}).exec((error,user)=>{

             //se ocorrer algum erro na hora de inserir os dados do usuário no banco
        if(error){
            
            app.utils.error.send(error,require,response);

        } else {//se não der erro na hora de inserir o usuário no banco

                                 //variável de callback do db.insert
            response.status(200).json(user);


        }



    });

});//fim routeId.get

//ALTERAÇÃO DE DADOS DE USUÁRIO
routeId.put((require,response)=>{

    if(!app.utils.validator.user(app,require,response)) return false;


    //traz um usuário específico
                                      //dados novos 
    db.update({_id:require.params.id},require.body, error=>{

             //se ocorrer algum erro na hora de inserir os dados do usuário no banco
        if(error){
            
            app.utils.error.send(error,require,response);

        } else {//se não der erro na hora de inserir o usuário no banco

                                 //variável de callback do db.insert
            response.status(200).json(Object.assign(require.params,require.body));


        }



    });

});//fim routeId.get


//DELETAR USUÁRIO
routeId.delete((require,response)=>{

    db.remove({_id:require.params.id}, {}, error=>{

                  //se ocorrer algum erro na hora de inserir os dados do usuário no banco
        if(error){
            
            app.utils.error.send(error,require,response);

        } else {//se não der erro na hora de inserir o usuário no banco

                                 //variável de callback do db.insert
            response.status(200).json(require.params);

        }


    })


})



};//Fim module.exports