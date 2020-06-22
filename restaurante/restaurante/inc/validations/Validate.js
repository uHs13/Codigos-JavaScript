class Validate {

    constructor(validations, data) {

        this.validations = validations;
        this.data = data;

    }
    // .constructor

    validate() {

        return new Promise((res, rej) => {

            Object.keys(this.data).forEach(key => {

                let validate = this.validations.find(pos => pos[0] === key);

                if (!validate) {

                    rej('Erro no formulário');

                } else if (this.data[key].length < validate[2]) {

                    rej(`Preencha o campo ${validate[1]}`);

                } else if (this.data[key].length > validate[3]) {

                    rej(`Campo ${validate[1]} excedeu o limite de caracteres`);

                }

            });

            res(this.data);

        });

    }
    // .validate

}
// .Validate

module.exports = Validate;