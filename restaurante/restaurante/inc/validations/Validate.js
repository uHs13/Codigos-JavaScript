class Validate {

    constructor(validations, data) {

        this._validations = validations;
        this._data = data;

    }
    // .constructor

    get validations() {
 
        return this._validations;

    }
    // .validations

    set validations(array) {
 
        this._validations = array;

    }
    // .validations

    get data() {
 
        return this._data;

    }
    // .data

    validate() {

        return this.validation(this.validations, this.data);

    }
    // .validate

    validation() {

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