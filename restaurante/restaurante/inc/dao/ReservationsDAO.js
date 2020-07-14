let sql = require('./../db/db');
const MyDate = require('./../mydate/MyDate');
const Pagination = require('../pagination/Pagination');
let moment = require('moment');

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

            let page = (req.query.page) ? req.query.page : 1;
            let dateStart = (req.query.start) ? req.query.start : '';
            let dateEnd = (req.query.end) ? req.query.end : '';

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

    static chart(req) {

        return new Promise((res, rej) => {

            sql.query(`

                SELECT
                CONCAT(YEAR(DATE), '-', MONTH(DATE)) AS date,
                COUNT(ID) AS total,
                SUM(PEOPLE) / COUNT(ID) AS avg_people
                FROM TB_RESERVATIONS
                WHERE
                DATE BETWEEN ? AND ?
                GROUP BY YEAR(DATE), MONTH(DATE)
                ORDER BY YEAR(DATE) DESC, MONTH(DATE) DESC

            `, [
                req.query.start,
                req.query.end
            ], (error, results) => {

                if (error) rej(error);

                let months = [];
                let values = [];

                results.forEach(result => {

                    months.push(moment(result.date).format('MMM YYYY'));
                    values.push(result.total);

                });

                res({
                    months,
                    values
                });

            });

        });

    }
    // .chart

}
// .ReservationsDAO

module.exports = ReservationsDAO;