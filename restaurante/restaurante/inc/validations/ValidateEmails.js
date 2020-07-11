const Validate = require("./Validate");

class ValidateEmails extends Validate{

    constructor(data) {

        super([

            ['email', 'Email', 1, 256]

        ], data);

    }
    // .constructor

}
// .ValidateEmails

module.exports = ValidateEmails;