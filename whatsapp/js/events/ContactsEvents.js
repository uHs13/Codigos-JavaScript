class ContactsEvents {

    constructor(elList) {

        this.elList = elList;

        this.screen = new Screen(this.elList);

        this.bindEvents()

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

            console.log(this.elList.formPanelAddContact.getJsonData());

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