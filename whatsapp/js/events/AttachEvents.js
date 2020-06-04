import { Screen } from '../screen/Screen';
import { CameraEvents } from '../events/CameraEvents';
import { Document } from '../document/Document';

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

            this.elList.pictureCamera.hide();

            this.elList.videoCamera.show();

            this.elList.containerTakePicture.show();

            this.elList.containerSendPicture.hide();

            this.elList.btnReshootPanelCamera.hide();

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

            let base64 = this.cameraEvents.takePicture();

            this.elList.pictureCamera.src = base64;

            this.elList.pictureCamera.show();

            this.elList.videoCamera.hide();

            this.elList.btnReshootPanelCamera.show();

            this.elList.containerTakePicture.hide();

            this.elList.containerSendPicture.show();

        });
        // .btnTakePicture

        this.elList.btnReshootPanelCamera.on('click', () => {

            this.elList.pictureCamera.hide();

            this.elList.videoCamera.show();

            this.elList.containerTakePicture.show();

            this.elList.containerSendPicture.hide();

            this.elList.btnReshootPanelCamera.hide();

        });
        // .btnReshootPanelCamera

        this.elList.btnSendPicture.on('click', () => {

            console.log(this.elList.pictureCamera.src);

            this.cameraEvents.stopCamera();

        });

    }
    // .btnAttachCameraEvents

    btnAttachDocumentEvents() {

        this.elList.btnAttachDocument.on("click", () => {

            this.screen.closeAllMainPanel();

            this.elList.panelDocumentPreview.addClass('open');

            this.elList.panelDocumentPreview.css({
                height: 'calc(100% - 110px)'
            });

            this.elList.inputDocument.click();

        });
        // .btnAttachDocument

        this.elList.inputDocument.on('change', () => {

            if (this.elList.inputDocument.files.length) {

                this.elList.panelDocumentPreview.css({
                    height: '1%'
                });

                let file = this.elList.inputDocument.files[0];

                this.document = new Document(file);

                this.document.previewData().then(data => {

                    let type = data.src.split(',')[0].split(':')[1].split(';')[0];

                    switch (type) {

                        case 'image/jpg':
                        case 'image/png':
                        case 'image/gif':
                        case 'image/webp':
                        case 'image/jpeg':

                            this.elList.imgPanelDocumentPreview.src = data.src;

                            this.elList.infoPanelDocumentPreview.innerHTML = data.title;

                            this.elList.filePanelDocumentPreview.hide();

                            this.elList.imagePanelDocumentPreview.show();

                            this.elList.panelDocumentPreview.css({
                                height: 'calc(100% - 110px)'
                            });

                            break;

                    }
                    // .switch

                }).catch(error => {

                    console.log(error);

                    this.elList.panelDocumentPreview.css({
                        height: 'calc(100% - 110px)'
                    });

                    switch (file.type) {

                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.ms-powerpoint.presentation.macroEnabled.12':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':

                            this.elList.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';

                            break;

                        case 'application/vnd.ms-excel':
                        case 'application/vnd.ms-excel.sheet.macroEnabled.12':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':

                            this.elList.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';

                            break;

                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':

                            this.elList.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';

                            break;

                        default:

                            this.elList.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';

                            break;

                    }
                    // .switch

                    this.elList.filenamePanelDocumentPreview.innerHTML = file.name;

                    this.elList.filePanelDocumentPreview.show();

                    this.elList.imagePanelDocumentPreview.hide();

                });
                // .catch

            }

        });
        // .inpuDocument

        this.elList.btnClosePanelDocumentPreview.on("click", () => {

            this.screen.closeAllMainPanel();

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