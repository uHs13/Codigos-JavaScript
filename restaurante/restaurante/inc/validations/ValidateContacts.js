const Validate = require("./Validate");

class ValidateContacts extends Validate{

    constructor(data) {

        super([
            ['name', 'Nome', 1, 256],
            ['email', 'E-mail', 1, 256],
            ['message', 'Mensagem', 1, 300]
        ], data);

    }
    // .constructor

}
// .ValidateContacts

module.exports = ValidateContacts;