import {Screen} from '../screen/Screen';
import { Upload } from '../upload/Upload';

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

        this.elList.inputProfilePhoto.on("change", () => {

            if (this.elList.inputProfilePhoto.files.length > 0) {

                let file = this.elList.inputProfilePhoto.files[0];

                Upload.send(this.user.email, file).then(snapshot => {

                    this.user.photo = snapshot.downloadURL;
                    this.user.save().then(() => {

                        this.elList.btnClosePanelEditProfile.click();

                    });

                });

            }

        });
        // .inputProfilePhoto

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

        });
        //.btnSavePanelEditProfile

    }
    // .profileEvents

}
// .ProfileEvents