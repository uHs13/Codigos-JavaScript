let sql = require('../db/db');

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

    static getAll(uuid) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_GETUSERS(?)

            `, [
                uuid
            ], (error, results) => {

                if (error) rej(error);

                let response = {};

                results[0].forEach((result, index) => {

                    let users = {
                        id: result['IDUSERS'],
                        name: result['NAME'],
                        email: result['EMAIL']
                    };

                    response[index] = users;

                });

                res(response);

            });

        });

    }
    // .getAll

    static save(user) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_INSERTUSER(?, ?, ?)

            `, [
                user.name,
                user.email,
                user.password
            ], (error, results) => {

                (error)
                ? rej(error)
                : res(true);

            });

        });

    }
    // .save

    static edit(user) {

        return new Promise((res, rej) => {

            sql.query(`

               CALL SP_EDITUSERS(?, ?, ?)

            `, [
                user.id,
                user.name,
                user.email
            ], (error, results) => {

                (error)? rej(error): res(true);

            });

        });

    }
    // .edit

    static delete(id) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_DELETEUSERS(?)

            `, [
                id
            ], (error, results) => {

                if (error) rej(error);

                res(results);

            });

        });

    }
    // .delete

    static updatePassword(user) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_UPDATEPASSWORDUSERS(?, ?)

            `, [
                user.id,
                user.password
            ], (error, results) => {

                if (error) rej(error);

                res(results);

            });

        });

    }
    // .updatePassword

}
// .UserDAO

module.exports = UserDAO;