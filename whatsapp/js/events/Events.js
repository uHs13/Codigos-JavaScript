class Events {

    constructor(el) {

        this.elList = el;

        this.microphoneEvents = new MicrophoneEvents(this.elList);

        this.profileEvents = new ProfileEvents(this.elList);

        this.contactsEvents = new ContactsEvents(this.elList);

        this.attachEvents = new AttachEvents(this.elList);

    }
    //.constructor

}
//.Events