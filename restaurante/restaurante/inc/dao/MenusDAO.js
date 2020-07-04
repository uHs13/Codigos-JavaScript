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

    static save(menuData) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_INSERTMENUS(?, ?, ?, ?)

            `, [
                menuData.title,
                menuData.description,
                menuData.price,
                `images/${menuData.photo.path}`
            ], (error, results) => {

                if (error) rej(error);

                res(results);

            });

        });

    }
    // .save

    static edit(menuData) {

        return new Promise((res, rej) => {

            sql.query(`

                CALL SP_EDITMENUS(?, ?, ?, ?, ?)

            `, [
                menuData.id,
                menuData.title,
                menuData.description,
                menuData.price,
                (menuData.photo.path)? `images/${menuData.photo.path}` : ''
            ], (error, results) => {

                if (error) rej(error);

                res(results);

            });

        });

    }
    // .save

}
// .MenusDAO

module.exports = MenusDAO;