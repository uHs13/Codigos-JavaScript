import { UserDAO } from './../DAO/UserDAO';
import { Model } from './Model';

export class User extends Model {

    constructor(id) {

        super();

        if (id) {

            this.getById(id.email).then((doc) => {

                if (!doc) {

                    this.name = id.displayName;
                    this.email = id.email;
                    this.photo = id.photoURL;

                    this.save();

                }

            });

        }

    }
    // .constructor

    get name() {
        return this._data.name;
    }

    set name(name) {
        this._data.name = name;
    }

    get email() {
        return this._data.email;
    }

    set email(email) {
        this._data.email = email;
    }

    get photo() {
        return this._data.photo;
    }

    set photo(photo) {
        this._data.photo = photo;
    }

    getById(id) {

        return new Promise((res, rej) => {

            User.findByEmail(id).onSnapshot(doc => {

                this.fromJSON(doc.data());

                res(doc.data());

            });

        });

    }
    // .getById

    save() {

        return UserDAO.save(this.email, this.toJSON());

    }
    // .save

    static findByEmail(email) {

        return UserDAO.findByEmail(email);

    }
    // .getRef

}
// .User