import { Firebase } from './../firebase/Firebase';

export class UserDAO {

    static getRef() {

        return Firebase.db().collection('/users');

    }
    // .getRef

    static getContactsRef(userEmail) {

        return Firebase.db()
        .collection('/users')
        .doc(userEmail)
        .collection('contacts');

    }
    // .getContactsRef

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

        return UserDAO.getContactsRef(userEmail)
        .doc(btoa(contactData.email))
        .set(contactData);

    }
    // .saveContact

    static getContacts(userEmail) {

        return new Promise((res, rej) => {

            UserDAO.getContactsRef(userEmail).onSnapshot(docs => {

                let contacts = [];
    
                docs.forEach(doc => {
    
                    let data = doc.data();
    
                    data.id = doc.id;
    
                    contacts.push(data);
    
                });
    
                res({
                    contacts,
                    docs
                });
    
            });

        });

    }
    // .getContacts

}
// .UserDAO