import {Screen} from "../screen/Screen";

export class ContactsEvents {

    constructor(elList, firebaseUserInstance) {

        this.elList = elList;

        this.screen = new Screen(this.elList);

        this.user = firebaseUserInstance;

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.contactsEvents();

    }
    // .bindEvents

    contactsEvents() {

        this.elList.btnNewContact.on("click", () => {
            // nova conversa

            this.screen.closeLeftSidePanel();

            this.elList.panelAddContact.show();

            setTimeout(() => {

                this.elList.panelAddContact.addClass("open");

            }, 300);

            

        });
        //.btnNewContact

        this.elList.btnClosePanelAddContact.on("click", () => {
            // fechar nova conversa

            this.elList.panelAddContact.hide();

            this.elList.paneSide.show();

            

        });
        //.btnClosePanelAddContact

        this.elList.formPanelAddContact.on("submit", (e) => {
            // botão submit nova conversa

            e.preventDefault();

            let formData = new FormData(this.elList.formPanelAddContact);

            this.user.addContact(formData.get('email')).then(res => {

                this.elList.btnClosePanelAddContact.click();

            });

        });
        // .formPanelAddContact

        this.elList.contactsMessagesList.querySelectorAll(".contact-item").forEach(contact => {
            //clique em um contato na lista de contatos.

            contact.on("click", () => {

                this.elList.home.hide();

                this.elList.main.css({

                    display: 'flex'

                });

            });

        });
        // .contactsMessagesList

    }
    // .contactsEvents

}
// .ContactsEvents