let sql = require("./../db/db");

class EmailDAO {

    static getAll() {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_GETEMAILS()

            `, (error, results) => {

                if (error) rej(error);

                let response = {};

                results[0].forEach((result, index) => {

                    let emails = {
                        id: result['ID'],
                        email: result['EMAIL']
                    };

                    response[index] = emails;

                });

                res(response);

            });

        });

    }
    // .getAll

    save(jsonData) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_INSERTEMAIL(?)

            `, [
                jsonData.email
            ], (error, results) => {

                (error)? rej(error): res(true);

            });

        });

    }
    // .save

    static delete(id) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_DELETEEMAILS(?)

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
// .EmailDAO

module.exports = EmailDAO;