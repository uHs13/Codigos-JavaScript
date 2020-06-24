let sql = require('./../db/db');

class ReservationsDAO {

    save(jsonData) {

        return new Promise((res, rej) => {

            sql.query(`

                INSERT INTO TB_RESERVATIONS (
                    NAME,
                    EMAIL,
                    PEOPLE,
                    DATE,
                    TIME
                    ) VALUES (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                    )

            `, [
                jsonData.name,
                jsonData.email,
                jsonData.people,
                jsonData.date,
                jsonData.time
            ], (error, results) => {

                (error)? rej(error): res(results);

            });

        });

    }
    // .save

}
// .ReservationsDAO

module.exports = ReservationsDAO;