import { UserDAO } from './../DAO/UserDAO';
import { Event } from './../events/Event';

export class User extends Event {

    static findByEmail(email) {

        return UserDAO.findByEmail(email);

    }
    // .getRef

}
// .User