const Login = require("../login/Login");

module.exports = function(req, res, next) {

    Login.checkUserUUID(req.session.user).then(response => {

        req.session.user = response;

        next();

    }, reject => {

        res.redirect('/admin');

    });

}
