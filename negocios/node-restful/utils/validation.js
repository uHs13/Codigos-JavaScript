module.exports = {

    validation:(app,req,res)=>{

        req.assert('name','nome invalido').notEmpty();
        req.assert('email','email invalido').notEmpty().isEmail();
        req.assert('gender','sexo invalido').notEmpty();
        req.assert('cpf','cpf invalido').notEmpty();

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