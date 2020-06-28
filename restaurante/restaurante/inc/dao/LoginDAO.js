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

    checkUserUUID(uuid) {

        return new Promise((res, rej) => {

            db.query(`
                CALL SP_CHECKUSERUUID(?)
            `, [
                uuid
            ], (error, results) => {

                if(error) rej(error);

                res(results[0]['0']['RESPONSE']);

            });

        });

    }
    // .checkUUID

    changeUserUUID(uuid) {

        return new Promise((res, rej) => {

            db.query(`
                CALL SP_CHANGEUSERUUID(?)
            `, [
                uuid
            ], (error, results) => {

                if(error) rej(error);

                res(results[0]['0']['RESPONSE']);

            });

        });

    }
    // .changeUserUUID

}
// .LoginDAO

module.exports = LoginDAO;