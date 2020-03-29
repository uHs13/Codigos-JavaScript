/* DESNECESSÁRIO APÓS A INSTALAÇÃO DO CONSIGN
const express = require('express');

let routes = express.Router();//biblioteca de rotas do express
*/

const nedb = require('nedb');

//instanciamos a variável db com um objeto que tem o tipo igual o nome da variável que recebeu o require do nedb;
let db = new nedb({

    filename:'players.db',
    autoload:true

});

module.exports = (app) => {//o consign passa o app pros arquivos

    let route = app.route('/players');//rota padrão do arquivo

    route.get((req, res) => {

        //db.find(o_que_procuras,)  sort({nome_da_chave_que_vai_determinar_a_ordem: 1 || -1 ( passa 1 se quiser crescente e -1 pra decrescente )})
        db.find({}).sort({name:1}).exec((err,userData)=>{

            
            if(err){

              app.utils.error.showError(err,req,res,400);

            } else {

                res.statusCode = 200;

                res.setHeader('Content-Type', 'application/json');
        
                //exibe o conteúdo na tela
                res.json({
                    
                    players:userData

                });//mostra todos os jogadores do banco
        

            }

        });//fim db.find

     
    });//fim app.get

    route.post((req, res) => {


        // //exibe os dados enviados
        // res.json(req.body);//por padrão o express não consegue interpretar os dados recebidos. Para fazer isso temos que instalar um complemento, body-parser
      
        
        if(!app.utils.validation.validation(app,req,res)){
            
            return false;
        
        }

         //db.insert(o_que_inserir,(variável que recebe um possível erro, registro salvo dos dados inseridos))               
        db.insert(req.body,(err,userData)=>{

            if(err){

                app.utils.error.showError(err,req,res,400);

            } else {

                res.status(200).json(userData);

            }

        });//fim db.insert

    });//fim app.post


    let routeName = app.route('/players/:name');

    routeName.get((req,res)=>{
                        //o node já entende que :id é o parametro passado e cria a variavel id dentro dos parametros do request
        db.findOne({name:req.params.name}).exec((err,player)=>{

            if(err || player === null){
                
                app.utils.error.showError((err === null)?'player don´t exists':err,req,res,400);

            } else {

                res.status(200).json(player);//para retornar um dado específico do jogador basta colocar player.name, player.position (name e position são os atributos definidos para os jogadores. Eles foram definidos na hora de inserir os dados via POST )

            }

        });//fim db.findOne

    });//fim routeId.get

    let routeId = app.route('/players/:id');

    routeId.put((req,res)=>{


        if(!app.utils.validation.validation(app,req,res)){
            
            return false;
        
        }

        
        //db.update({valor_a_ser_procurado},novos_valores)
        db.update({_id:req.params.id},req.body,err=>{

            if(err){
                
                app.utils.error.showError(err,req,res,400);

            } else {
                                    //fazemos o assign para podermos mostrar todas as informações do usuário. No req.body ( novos dados ) não temos o id, ele está somente nos parâmetros da requisição. 
                res.status(200).json(Object.assign(req.body,req.params));//para retornar um dado específico do jogador basta colocar player.name, player.position (name e position são os atributos definidos para os jogadores. Eles foram definidos na hora de inserir os dados via POST )

            }

        });//fim db.update

    });//fim routeId.put


    routeId.delete((req,res)=>{

        db.remove({_id:req.params.id},{},err=>{

            if(err){
                
                app.utils.error.showError(err,req,res,400);

            } else {
                                    //fazemos o assign para podermos mostrar todas as informações do usuário. No req.body ( novos dados ) não temos o id, ele está somente nos parâmetros da requisição. 
                res.status(200).json(`${JSON.stringify(req.params)} deleted successfully`);//para retornar um dado específico do jogador basta colocar player.name, player.position (name e position são os atributos definidos para os jogadores. Eles foram definidos na hora de inserir os dados via POST )

            }

        });

    });

};//fim module.exports