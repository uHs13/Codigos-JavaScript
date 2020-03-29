module.exports = {//criando funções dentro de json 

    user:(app,require,response)=>{

            //Validando dados antes de inserir no banco
            require.assert('name','insert a valid name').notEmpty();
            require.assert('email','insert a valid e-mail').notEmpty().isEmail();
            require.assert('password','insert a valid password').notEmpty();


            let errors = require.validationErrors();

            if(errors){ //se der erro

                app.utils.error.send(errors,require,response);
                return false;
                
            } else { // não deu erro

                return true;


            }
            
    }




}