const LoginDAO = require("../dao/LoginDAO");

class Login {

    constructor(data) {

        this.data = data;

        this.errorMsg = 'Email ou senha incorretos';

    }
    // .constructor

    login() {

        return new Promise((res, rej) => {

            let dao = new LoginDAO();

            dao.login(this.data.email, this.data.password).then(results => {

                if (results === '0') {

                    rej(this.errorMsg);

                }

                res(results);

            }, reject => {

                rej(this.errorMsg);

            });

        });

    }
    // .login

    static checkUserUUID(uuid) {

        return new Promise((res, rej) => {

            let dao = new LoginDAO();

            dao.checkUserUUID(uuid).then(response => {

                if (response == '1') {

                    dao.changeUserUUID(uuid).then(results => {

                        res(results);

                    });

                } else {

                    rej();

                }               

            }, reject => {

                rej(reject);

            });

        });

    }
    // .checkUUID

}
// .Login

module.exports = Login;