class Reservations {

    constructor(data = null) {

        if (data) this.data = data;

    }
    // .data

    save() {

        let dao = new ReservationsDAO();

        return dao.save(Utils.safeEntry(this.data));

    }
    // .save

}
// .Reservations

module.exports = Reservations;