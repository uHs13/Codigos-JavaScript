let sql = require('./../db/db');
const MyDate = require('./../mydate/MyDate');

class ReservationsDAO {

    static save(reservation) {

        return new Promise((res, rej) => {

            if (reservation.date.search('/') > 0) {

                reservation.date = MyDate.adaptBrDatetoMysqlDate(reservation.date);

            }

            sql.query(`

               CALL SP_INSERTRESERVATIONS(?, ?, ?, ?, ?)

            `, [
                reservation.name,
                reservation.email,
                reservation.people,
                reservation.date,
                reservation.time
            ], (error, results) => {

                (error)? rej(error): res(true);

            });

        });

    }
    // .save

    static getAll() {

        return new Promise((res, rej) => {

            sql.query(`

               CALL SP_GETRESERVATIONS

            `, (error, results) => {

                if (error) rej(error);

                let response = {};

                results[0].forEach((result, index) => {

                    let reservations = {
                        id: result['ID'],
                        name: result['NAME'],
                        email: result['EMAIL'],
                        people: result['PEOPLE'],
                        date: result['DATE'],
                        time: result['TIME'],
                    };

                    response[index] = reservations;

                });

                res(response);

            });

        });

    }
    // .getAll

    static edit(reservation) {

        return new Promise((res, rej) => {

            let time = reservation.time.split(':');

            reservation.time = `${time[0]}:${time[1]}`;

            sql.query(`

               CALL SP_EDITRESERVATIONS(?, ?, ?, ?, ?, ?)

            `, [
                reservation.id,
                reservation.name,
                reservation.email,
                reservation.people,
                reservation.date,
                reservation.time
            ], (error, results) => {

                (error)? rej(error): res(true);

            });

        });

    }
    // .edit

    static delete(id) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_DELETERESERVATIONS(?)

            `, [
                id
            ], (error, results) => {

                if (error) rej(error);

                res(results);

            });

        });

    }
    // .delete

}
// .ReservationsDAO

module.exports = ReservationsDAO;