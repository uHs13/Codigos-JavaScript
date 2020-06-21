let sql = require('./../db/db');

class Meal {

    static getAll() {

        return new Promise((res, rej) => {

            sql.query(`
            SELECT
            TITLE as title,
            DESCRIPTION as description,
            PRICE as price,
            PHOTO as photo
            FROM TB_MENUS
            ORDER BY TITLE
        `, (err, results) => {

            if (err){

                rej(err)

            };

            res(results);

        });

        });

    }
    // .getAll

}
// .Meal

module.exports = Meal;