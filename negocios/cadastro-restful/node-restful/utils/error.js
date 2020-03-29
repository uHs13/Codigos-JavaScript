module.exports = {

    showError:(err,req,res,code = 400)=>{
        
        console.log(`ERROR: ${err}`);

        //erro de solicitação/ envio de informação do usuário
            //define o status do servidor;
        res.status(code).json({

            ERROR:err

        });

    }

};