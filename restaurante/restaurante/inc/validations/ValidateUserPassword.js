const Validate = require("./Validate");

class ValidateUserPassword extends Validate{

    constructor(data) {

        super([
            ['id', 'usuario', 1, 6],
            ['password', 'Nova Senha', 1, 100],
            ['passwordConfirm', 'Confirmar Senha', 1, 100]
        ], data);

    }
    // .constructor

    comparePasswords(data) {

        return new Promise((res, rej) => {

            if (data.password != data.passwordConfirm) {

                rej('confirme as senhas corretamente');

            } else {

                res(data);

            }

        });

    }
    // .comparePasswords

}
// .ValidateUserPassword

module.exports = ValidateUserPassword;