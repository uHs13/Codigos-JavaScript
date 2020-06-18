import {MicrophoneEvents} from '../events/MicrophoneEvents';
import {ProfileEvents} from '../events/ProfileEvents';
import {ContactsEvents} from '../events/ContactsEvents';
import {AttachEvents} from '../events/AttachEvents';
import {MessageEvents} from '../events/MessageEvents';

export class Events {

    constructor(el, firebaseUserInstance, notify) {

        this.elList = el;

        this.microphoneEvents = new MicrophoneEvents(this.elList, firebaseUserInstance);

        this.profileEvents = new ProfileEvents(this.elList, firebaseUserInstance);

        this.contactsEvents = new ContactsEvents(this.elList, firebaseUserInstance, notify);

        this.attachEvents = new AttachEvents(this.elList, firebaseUserInstance);

        this.messageEvents = new MessageEvents(this.elList, firebaseUserInstance);

    }
    //.constructor

}
//.Events