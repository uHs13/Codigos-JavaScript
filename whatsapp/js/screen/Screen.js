class Screen {

    constructor(elList) {

        this.elList = elList;

    }
    // .constructor

    changeDisplayMode(htmlIdinCamelCase) {

        let display = (eval(`this.elList.${htmlIdinCamelCase}`).style.display == "block");

        eval(`this.elList.${htmlIdinCamelCase}`).css({

            display: (display) ? "none" : "block"

        });

    }
    // .changeDisplayMode

    closeLeftSidePanel() {

        this.elList.panelEditProfile.hide();

        this.elList.paneSide.hide();

    }
    //.closeLeftSidePanel

    closeMenuAttach() {

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
// .Screen