import {Screen} from '../screen/Screen';

export class ProfileEvents {

    constructor(elList, firebaseUserInstance) {

        this.elList = elList;

        this.user = firebaseUserInstance;

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

            this.elList.btnSavePanelEditProfile.style.disabled = true;

            this.user.name = this.elList.inputNamePanelEditProfile.innerHTML;

            this.user.save().then(() => {

                console.log(this.user.toJSON());

            }).catch(error => {

                console.error(error);

            });

            //this.user.save();

        });
        //.btnSavePanelEditProfile

    }
    // .profileEvents

}
// .ProfileEvents