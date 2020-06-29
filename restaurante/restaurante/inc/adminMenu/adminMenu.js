let MenuOptions = require('./../menuOptions/MenuOptions');

module.exports = function (req, res, next) {

    req.menus = MenuOptions.getMenuOptions(req);

    next();

};