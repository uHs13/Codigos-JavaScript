const ReservationsDAO = require("../dao/ReservationsDAO");

class Reservations {

    constructor(data = null) {

        if (data) this.data = data;

    }
    // .data

    save() {

        let dao = new ReservationsDAO();

        return dao.save(this.data);

    }
    // .save

}
// .Reservations

module.exports = Reservations;