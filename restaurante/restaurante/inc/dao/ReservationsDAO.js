let sql = require('./../db/db');
const MyDate = require('./../mydate/MyDate');
const Pagination = require('../pagination/Pagination');

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

                (error) ? rej(error) : res(true);

            });

        });

    }
    // .save

    static getAll(req) {

        return new Promise((res, rej) => {

            let page = (req.query.page) ? req.query.page :  1;
            let dateStart = (req.query.start) ? req.query.start : '';
            let dateEnd = (req.query.end) ? req.query.end :  '';

            let pagination = new Pagination(`
                CALL SP_GETRESERVATIONS(?, ?, ?, ?)
            `);

            pagination.getPage(page, dateStart, dateEnd).then(results => {

                let data = {};

                results.forEach((result, index) => {

                    let reservations = {
                        id: result['ID'],
                        name: result['NAME'],
                        email: result['EMAIL'],
                        people: result['PEOPLE'],
                        date: result['DATE'],
                        time: result['TIME'],
                    };

                    data[index] = reservations;

                });

                res({
                    data,
                    links: pagination.getPagination(req.query)
                });

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

                (error) ? rej(error) : res(true);

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