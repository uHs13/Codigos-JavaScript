import {Screen} from '../screen/Screen';

export class ProfileEvents {

    constructor(elList) {

        this.elList = elList;

        this.screen = new Screen(this.elList);

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.profileEvents();

    }
    // .bindEvents

    profileEvents() {

        this.elList.myPhoto.on("click", () => {

            this.screen.closeLeftSidePanel();

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

}
// .ProfileEvents