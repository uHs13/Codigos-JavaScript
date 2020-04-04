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
            // nova conversa

            this.closeLeftSidePanel();

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

    btnAttachEvents() {

        this.elList.btnAttach.on("click", (e) => {
            //botão anexar

            e.stopPropagation();
            // executa somente nessa camada. Os elementos ancestrais do btnAttach não vão receber os efeitos colaterais da função

            this.elList.menuAttach.addClass("open");

            document.addEventListener("click", this.closeMenuAttach.bind(this));
            // Utilizando o bind para poder manter o escopo do this como a classe Event
            // dentro do document o this passaria a ser o próprio document, porém não queremos isso. Pra manter o escopo na classe Event usamos o bind.

        });
        // .btnAttach

        this.btnAttachPhotoEvents();

        this.btnAttachCameraEvents();

        this.btnAttachDocumentEvents();

        this.btnAttachContactEvents();

    }
    // .btnAttachEvents

    btnAttachPhotoEvents() {

        this.elList.btnAttachPhoto.on("click", () => {

            this.elList.inputPhoto.click();

        });
        // .btnAttachPhoto

        this.elList.inputPhoto.on("change", () => {

            //a lista de arquivos selectionados no input file é uma coleção que não pode ser iterada pelo forEach. Para percorrê-la temos que converter em array
            Array.from(this.elList.inputPhoto.files).forEach(file => {

                console.log(file);

            });

        });
        // .inputPhoto

    }
    // .btnAttachPhotoEvents

    btnAttachCameraEvents() {

        this.elList.btnAttachCamera.on("click", () => {

            this.closeAllMainPanel();

            this.elList.panelCamera.css({
                height: 'calc(100% - 120px)'
            });

            this.elList.panelCamera.addClass('open');

        });
        // .btnAttachCamera

        this.elList.btnClosePanelCamera.on('click', () => {

            this.closeAllMainPanel();

            this.elList.panelMessagesContainer.show();

        });
        // .btnClosePanelCamera

        this.elList.btnTakePicture.on('click', () => {

            console.log('click-zum');

        });
        // .btnTakePicture

    }
    // .btnAttachCameraEvents

    btnAttachDocumentEvents() {

        this.elList.btnAttachDocument.on("click", () => {

            this.closeAllMainPanel();

            this.elList.panelDocumentPreview.addClass('open');

            this.elList.panelDocumentPreview.css({
                height: 'calc(100% - 110px)'
            });

        });
        // .btnAttachDocument

        this.elList.btnClosePanelDocumentPreview.on("click", () => {

            this.closeAllMainPanel();

            this.elList.panelMessagesContainer.show();

        });
        // .btnClosePanelDocumentPreview

        this.elList.btnSendDocument.on("click", () => {

            console.log("Sending documents");

        });
        // .btnSendDocument

    }
    // .btnAttachDocumentsEvents

    btnAttachContactEvents() {

        this.elList.btnAttachContact.on("click", () => {

            this.elList.modalContacts.show();

        });
        // .btnAttachContact

        this.elList.btnCloseModalContacts.on("click", () => {

            this.elList.modalContacts.hide();

        });
        // .btnCloseModalContacts

    }
    // .btnAttachContactEvents

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

    closeAllMainPanel() {

        this.elList.panelMessagesContainer.hide();
        this.elList.panelCamera.removeClass('open');
        this.elList.panelDocumentPreview.removeClass('open');

    }
    // .closeAllMainPanel

}
//.Events