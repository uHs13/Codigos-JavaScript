import { Firebase } from './../firebase/Firebase';

export class UserDAO {

    static getRef() {

        return Firebase.db().collection('/users');

    }
    // .getRef

    static findByEmail(email) {

        return UserDAO.getRef().doc(email);

    }
    // .getUser

    static save(email, data) {

        UserDAO.findByEmail(email).set(data);

    }
    // .save

}
// .UserDAO