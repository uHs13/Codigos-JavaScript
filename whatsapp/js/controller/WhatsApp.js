import {Prototype} from '../prototype/Prototype';
import {Events} from '../events/Events';
import {Format} from '../format/Format';
import { Firebase } from '../firebase/Firebase';
import { User } from './../model/User';

export class WhatsApp {

    constructor() {

        Prototype.elementsPrototype();

        this.firebase = new Firebase();

        this.firebase.initAuth().then(res => {

            this.loadElements();

            this.user = new User(res.user.email);

            this.user.on('datachange', data => {

                document.querySelector('title').innerHTML = `${data.name} - Whatsapp Clone`;

                if (data.photo) {

                    let photo = this.el.imgPanelEditProfile;
                    photo.src = data.photo;
                    photo.show();
                    this.el.imgDefaultPanelEditProfile.hide();

                    let photo2 = his.el.myPhoto.querySelector('img');
                    photo2.src = data.photo;
                    photo2.show();

                }

            });

            this.el.appContent.css({
                display : 'flex'
            });

            this.events = new Events(this.el);

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