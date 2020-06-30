const sql = require('./../db/db');

class InfoDAO {

    static getGeneralInfo(uuid) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_GETGENERALINFO(?)

            `, [
                uuid
            ], (error, results) => {

                if (error) rej(error);

                res({
                    reservationsCount: results[0]['0']['RESERVATIONS'],
                    contactsCount: results[0]['0']['CONTACTS'],
                    menusCount: results[0]['0']['MENUS'],
                    usersCount: results[0]['0']['USERS']
                });

            });

        });

    }
    // .getGeneralInfo

}
// .InfoDAO

module.exports = InfoDAO;