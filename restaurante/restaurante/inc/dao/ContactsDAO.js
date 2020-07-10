let sql = require("./../db/db");

class ContactsDAO {

    save(jsonData) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_INSERTCONTACT(?, ?, ?)

            `, [
                jsonData.name,
                jsonData.email,
                jsonData.message
            ], (error, results) => {

                (error)? rej(error): res(true);

            });

        });

    }
    // .save

    static getAll() {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_GETCONTACTS()

            `, (error, results) => {

                if (error) rej(error);

                let response = {};

                results[0].forEach((result, index) => {

                    let contacts = {
                        id: result['ID'],
                        name: result['NAME'],
                        email: result['EMAIL'],
                        message: result['MESSAGE']
                    };

                    response[index] = contacts;

                });

                res(response);

            });

        });

    }
    // .getAll

    static delete(id) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_DELETECONTACTS(?)

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
// .ContactsDAO

module.exports = ContactsDAO;