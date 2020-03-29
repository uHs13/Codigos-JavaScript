class Events {

    constructor(el) {

        this.elList = el;

        this.initEvents();

    }
    //.el

    initEvents() {

       this.profileEvents();
       this.contactsEvents();
       this.btnAttachEvents();

    }
    //.initEvents

    profileEvents() {

        this.elList.myPhoto.on("click", () => {

            this.closeLeftSidePanel();

            this.elList.panelEditProfile.show();

            setTimeout(() => {

                this.elList.panelEditProfile.addClass("open");

            }, 300);

        });
        //.myPhoto

        this.elList.btnClosePanelEditProfile.on("click", () => {

            this.elList.panelEditProfile.removeClass("open");

            this.elList.paneSide.show();

        });
        //.btnClosePanelEditProfile

        this.elList.photoContainerEditProfile.on("click", () => {

            this.elList.inputProfilePhoto.click();

        });
        //.photoContainerEditProfile

        this.elList.inputNamePanelEditProfile.on("keypress", e => {

            if (e.key === "Enter") {

                e.preventDefault();

                this.elList.btnSavePanelEditProfile.click();

            }

        });
        //.inputNamePanelEditProfile

        this.elList.btnSavePanelEditProfile.on("click", () => {

            console.log(this.elList.inputNamePanelEditProfile.innerHTML);

        });
        //.btnSavePanelEditProfile

    }
    // .profileEvents

    contactsEvents() {

        this.elList.btnNewContact.on("click", () => {

            this.closeLeftSidePanel();

            this.elList.panelAddContact.show();

            setTimeout(() => {

                this.elList.panelAddContact.addClass("open");

            }, 300);

        });
        //.btnNewContact

        this.elList.btnClosePanelAddContact.on("click", () => {

            this.elList.panelAddContact.hide();

            this.elList.paneSide.show();

        });
        //.btnClosePanelAddContact

        this.elList.formPanelAddContact.on("submit", (e) => {

            e.preventDefault();

            console.log(this.elList.formPanelAddContact.getJsonData());

        });
        // .formPanelAddContact

        this.elList.contactsMessagesList.querySelectorAll(".contact-item").forEach(contact => {

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

    btnAttachEvents() {

        this.elList.btnAttach.on("click", (e) => {

            e.stopPropagation();

            this.elList.menuAttach.addClass("open");

            document.addEventListener("click", this.closeMenuAttach.bind(this));

        });
        // .btnAttach

        this.elList.btnAttachPhoto.on("click", () => {

            console.log("Photo");

        });
        // .btnAttachPhoto

        this.elList.btnAttachCamera.on("click", () => {

            console.log("Camera");

        });
        // .btnAttachCamera

        this.elList.btnAttachDocument.on("click", () => {

            console.log("Document");

        });
        // .btnAttachDocument

        this.elList.btnAttachContact.on("click", () => {

            console.log("Contact");

        });
        // .btnAttachContact
    }
    // .btnAttachEvents

    closeLeftSidePanel() {

        this.elList.panelEditProfile.hide();

        this.elList.paneSide.hide();

    }
    //.closeLeftSidePanel

    closeMenuAttach(event) {

        document.removeEventListener("click", this.closeMenuAttach);

        this.elList.menuAttach.removeClass("open");

    }
    // .closeMenuAttach

}
//.Events