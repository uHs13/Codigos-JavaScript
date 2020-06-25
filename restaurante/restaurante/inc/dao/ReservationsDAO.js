let sql = require('./../db/db');

class ReservationsDAO {

    save(jsonData) {

        return new Promise((res, rej) => {

            let date = jsonData.date.split('/');

            jsonData.date = `${date[2]}-${date[1]}-${date[0]}`;

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
                    CAST(? AS TIME)
                    )

            `, [
                jsonData.name,
                jsonData.email,
                jsonData.people,
                jsonData.date,
                jsonData.time
            ], (error, results) => {

                (error)? rej(error): res(true);

            });

        });

    }
    // .save

}
// .ReservationsDAO

module.exports = ReservationsDAO;