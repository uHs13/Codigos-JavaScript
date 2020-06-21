let sql = require('./../db/db');

class Meal {

    static getAll() {

        sql.query(`
            SELECT
            TITLE as title,
            DESCRIPTION as description,
            PRICE as price,
            PHOTO as photo
            FROM TB_MENUS
            ORDER BY TITLE
        `, (err, res) => {

            if (err) console.error(err);

            return res;

        });

    }
    // .getAll

}
// .Meal

module.exports = Meal;