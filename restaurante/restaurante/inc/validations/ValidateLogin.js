const Validate = require("./Validate");

class ValidateLogin extends Validate{

    constructor(data) {

        super([

            ['email', 'Email', 1, 256],
            ['password', 'Senha', 1, 100],

        ], data);

    }
    // .constructor

}
// .ValidateLogin

module.exports = ValidateLogin;