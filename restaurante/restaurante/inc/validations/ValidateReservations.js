const Validate = require("./Validate");

class ValidateReservations {

    constructor(data) {

        this._data = data;

        this._validations = [
            ['name', 'Nome', 1, 256],
            ['email', 'E-mail', 1, 256],
            ['people', 'Pessoas', 1, 11],
            ['date', 'Pessoas', 10, 10],
            ['time', 'Hora', 5, 5]
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
// .ValidateReservations

module.exports = ValidateReservations;