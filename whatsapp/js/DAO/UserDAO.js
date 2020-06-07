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

        return UserDAO.findByEmail(email).set(data);

    }
    // .save

    static saveContact(userEmail, contactData) {

        /*
            bota converte uma string em base64
            atob converte uma string base64 em plaintext
        */

        return UserDAO.findByEmail(userEmail)
        .collection('contacts')
        .doc(btoa(contactData.email))
        .set(contactData);

    }
    // .saveContact

}
// .UserDAO