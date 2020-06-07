import { UserDAO } from './../DAO/UserDAO';
import { Model } from './Model';

export class User extends Model {

    constructor(userInfo) {

        super();

        if (userInfo) {

            this.getById(userInfo.email).then((doc) => {

                if (!doc) {

                    this.name = userInfo.displayName;
                    this.email = userInfo.email;
                    this.photo = userInfo.photoURL;

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

    saveContact(contactData) {

        return UserDAO.saveContact(this.email, contactData);

    }
    // .saveContact

    static findByEmail(email) {

        return UserDAO.findByEmail(email);

    }
    // .getRef

    addContact(email) {

        return new Promise((res, rej) => {

            this.checkExists(email).then(doc => {

                if (doc) {
    
                    let contact = new User();
    
                    contact.fromJSON(doc.data());
    
                    res(this.saveContact(contact.toJSON()));
    
                } else {
    
                    console.log('user not found');
    
                }
    
            });

        });

    }
    // .addContact

    checkExists(email) {

        return new Promise((res, rej) => {

            User.findByEmail(email).onSnapshot(doc => {

               (doc) ? res(doc) : res(false);

            });

        });

    }
    // .checkExists

}
// .User