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

}
// .UserDAO