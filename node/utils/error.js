module.exports = { // abrindo um objeto json para exportar

    send: (error,request,response,code=400)=>{

        //mostramos o erro no terminal
        console.log(`error: ${error}`);
            
        //trocamos o status do servidor para indicar que ocorreu um erro e mostramos o em um json
        response.status(code).json({

            'error':error
        });

    }


};