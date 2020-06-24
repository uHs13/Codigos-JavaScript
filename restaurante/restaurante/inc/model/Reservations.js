const Utils = require("../utils/Utils");

class Reservations {

    constructor(data = null) {

        if (data) this.data = data;

    }
    // .data

    save() {

        let dao = new ReservationsDAO(this.data);

        return dao.save();

    }
    // .save

}
// .Reservations

module.exports = Reservations;