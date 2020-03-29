module.exports = {

    validation:(app,req,res)=>{

        req.assert('_name','nome invalido').notEmpty();
        req.assert('_email','email invalido').notEmpty();
        req.assert('_gender','sexo invalido').notEmpty();
        req.assert('_cpf','cpf invalido').notEmpty();

        let errors = req.validationErrors();

        //se tiver erro retorna um array, se não retorna vazio
        if(errors){

            app.utils.error.showError(errors,req,res,400);

            return false;

        } else {

            return true;

        }

    }





}