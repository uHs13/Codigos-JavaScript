import {Screen} from '../screen/Screen';
import {CameraEvents} from '../events/CameraEvents';

export class AttachEvents {

    constructor(elList) {

        this.elList = elList;

        this.screen = new Screen(this.elList);

        this.cameraEvents;

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.btnAttachEvents();

    }
    // .bindEvents

    btnAttachEvents() {

        this.elList.btnAttach.on("click", (e) => {
            //botão anexar

            e.stopPropagation();
            // executa somente nessa camada. Os elementos ancestrais do btnAttach não vão receber os efeitos colaterais da função

            this.elList.menuAttach.addClass("open");

            document.addEventListener("click", this.screen.closeMenuAttach.bind(this));
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

            this.screen.closeAllMainPanel();

            this.elList.panelCamera.css({
                height: 'calc(100% - 120px)'
            });

            this.elList.panelCamera.addClass('open');

            this.cameraEvents = new CameraEvents(this.elList.videoCamera);

        });
        // .btnAttachCamera

        this.elList.btnClosePanelCamera.on('click', () => {

            this.cameraEvents.stopCamera();

            this.screen.closeAllMainPanel();

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

            this.screen.closeAllMainPanel();

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


}
// .AttachEvents