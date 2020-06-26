let sql = require("./../db/db");

class ContactsDAO {

    save(jsonData) {

        return new Promise((res, rej) => {

            sql.query(`

                INSERT INTO TB_CONTACTS (
                    NAME,
                    EMAIL,
                    MESSAGE
                    ) VALUES (
                    ?,
                    ?,
                    ?
                    )

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

}
// .ContactsDAO

module.exports = ContactsDAO;