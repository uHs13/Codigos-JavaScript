import { Prototype } from '../prototype/Prototype';
import { Events } from '../events/Events';
import { Format } from '../format/Format';
import { Firebase } from '../firebase/Firebase';
import { User } from './../model/User';
import { Notify } from '../notify/Notify';

export class WhatsApp {

    constructor() {

        Prototype.elementsPrototype();

        this.firebase = new Firebase();

        this.firebase.initAuth().then(res => {

            this.loadElements();

            this.user = new User(res.user);

            this.user.on('datachange', data => {

                document.querySelector('title').innerHTML = `${data.name} - Whatsapp Clone`;

                this.el.inputNamePanelEditProfile.innerHTML = data.name;

                if (data.photo) {

                    let photo = this.el.imgPanelEditProfile;
                    photo.src = data.photo;
                    photo.show();
                    this.el.imgDefaultPanelEditProfile.hide();

                    let photo2 = this.el.myPhoto.querySelector('img');
                    photo2.src = data.photo;
                    photo2.show();

                }

                this.notify = new Notify(this.el, this.user);

                this.notify.checkNotifications();

                this.events = new Events(this.el, this.user, this.notify);

                this.el.appContent.css({
                    display: 'flex'
                });

            });

        }).catch(error => {

            console.error(error);

        });

    }
    //.constructor

    loadElements() {

        this.el = {};

        document.querySelectorAll("[id]").forEach(el => {

            this.el[Format.toCamelCase(el.id)] = el;

        });

    }
    //.loadElements

}
//.WhatsApp