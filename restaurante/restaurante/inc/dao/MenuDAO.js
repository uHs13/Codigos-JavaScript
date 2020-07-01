let sql = require('./../db/db');

class MenusDAO {

    static getAll() {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_GETMENUS

            `, (error, results) => {

                if (error) rej(error);

                let response = {};

                results['0'].forEach((result, index) => {

                    let menu = {
                        id: result['ID'],
                        title: result['TITLE'],
                        description: result['DESCRIPTION'],
                        price: result['PRICE'],
                        photo: result['PHOTO']
                    };

                    response[index] = menu;

                });

                res(response);

            });

        });

    }
    // .getAll

}
// .MenusDAO

module.exports = MenusDAO;