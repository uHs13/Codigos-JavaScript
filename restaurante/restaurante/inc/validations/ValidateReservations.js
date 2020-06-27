const Validate = require("./Validate");

class ValidateReservations extends Validate{

    constructor(data) {

        super([
            ['name', 'Nome', 1, 256],
            ['email', 'E-mail', 1, 256],
            ['people', 'Pessoas', 1, 11],
            ['date', 'Pessoas', 10, 10],
            ['time', 'Hora', 5, 5]
        ], data);

    }
    // .constructor

}
// .ValidateReservations

module.exports = ValidateReservations;