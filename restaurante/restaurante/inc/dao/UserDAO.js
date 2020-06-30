let sql = require('./../db/db');

class UserDAO {

    static get(uuid) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_GETUSERINFO(?)

            `, [
                uuid
            ], (error, results) => {

                if (error) rej(error);

                res({
                    name: results[0]['0']['NAME'],
                    email: results[0]['0']['EMAIL']
                });

            });

        });

    }
    // .hash

}
// .UserDAO

module.exports = UserDAO;