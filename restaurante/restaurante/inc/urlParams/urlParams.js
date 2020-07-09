const UserDAO = require('../dao/UsersDAO');

module.exports = {

    /**
     * Don´t repeat yourself
     */

    getParams(req, params) {

        return new Promise((res, rej) => {

            UserDAO.get(req.session.user).then(userInfo => {

                res(Object.assign({}, {
                    menus: req.menus,
                    title: 'Administração Saboroso',
                    user: userInfo
                }, params));

            });

        });

    }
    // .getParams

};