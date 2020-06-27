let db = require('./../db/db');

class LoginDAO {

    login(email, password) {

        return new Promise((res, rej) => {

            db.query(`

                CALL SP_CHECKUSERPASSWORD(?, ?)

            `, [
                email,
                password
            ], (error, results) => {

                if (error) rej(error);

                res(results[0]['0']['RESPONSE']);

            });

        });

    }
    // .login

}
// .LoginDAO

module.exports = LoginDAO;