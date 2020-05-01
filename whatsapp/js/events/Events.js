import {MicrophoneEvents} from '../events/MicrophoneEvents';
import {ProfileEvents} from '../events/ProfileEvents';
import {ContactsEvents} from '../events/ContactsEvents';
import {AttachEvents} from '../events/AttachEvents';
import {MessageEvents} from '../events/MessageEvents';

export class Events {

    constructor(el) {

        this.elList = el;

        this.microphoneEvents = new MicrophoneEvents(this.elList);

        this.profileEvents = new ProfileEvents(this.elList);

        this.contactsEvents = new ContactsEvents(this.elList);

        this.attachEvents = new AttachEvents(this.elList);

        this.messageEvents = new MessageEvents(this.elList);

    }
    //.constructor

}
//.Events