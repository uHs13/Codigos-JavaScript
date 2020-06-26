const Validate = require("./Validate");

class ValidateContacts {

    constructor(data) {

        this._data = data;

        this._validations = [
            ['name', 'Nome', 1, 256],
            ['email', 'E-mail', 1, 256],
            ['message', 'Mensagem', 1, 300]
        ];

    }
    // .constructor

    get validations() {
 
        return this._validations;

    }
    // .validations

    set validations(array) {
 
        this._validations = array;

    }
    // .validations

    get data() {
 
        return this._data;

    }
    // .data

    validate() {

        let validate = new Validate(this.validations, this.data);

        return validate.validate();

    }
    // .validate
}
// .ValidateContacts

module.exports = ValidateContacts;