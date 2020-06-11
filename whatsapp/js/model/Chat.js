import { Model } from './Model';
import { User } from './User';
import { Firebase } from '../firebase/Firebase';

export class Chat extends Model {

    constructor() {

        super();

    }
    // .constructor

    get users() {
        return this._data.users;
    }

    set users(users) {
        return this._data.users = users;
    }

    get timeStamp() {
        return this._data.timeStamp;
    }

    set timeStamp(timeStamp) {
        return this._data.timeStamp = timeStamp;
    }

    static getRef() {

        return Firebase.db().collection('/chats');

    }
    // .getRef

    static find(userEmail, contactEmail) {

        return Chat.getRef()
        .where(btoa(userEmail), '==', true)
        .where(btoa(contactEmail), '==', true)
        .get();

    }
    // .find

    static createChat(userEmail, contactEmail) {

        return new Promise((res, rej) => {

            let users = {};

            users[btoa(userEmail)] = true;
            users[btoa(contactEmail)] = true;

            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc => {

                Chat.getRef().doc(doc.id).get().then(chat => {

                    res(chat);

                }).catch(error => {

                    console.error(error);

                    rej(error);

                });

            }).catch(error => {

                console.error(error);

                rej(error);

            });

        });

    }
    // .createChat

    static create(userEmail, contactEmail) {

        return new Promise((res, rej) => {

            let user = new User();

            user.checkExists(contactEmail).then(doc => {

                if (!doc) rej(false);

                Chat.find(userEmail, contactEmail).then(chats => {

                    if (chats.empty) {

                        Chat.createChat(userEmail, contactEmail).then(chat => {

                            res(chat);

                        });

                    } else {

                        chats.forEach(chat => {

                            res(chat);

                        });

                    }

                }).catch(error => {

                    console.error(error);

                });

            });

        });

    }
    // .create

}
// .Chat