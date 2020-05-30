import {Prototype} from '../prototype/Prototype';
import {Events} from '../events/Events';
import {Format} from '../format/Format';
import { Firebase } from '../firebase/Firebase';
import { User } from './../model/User';

export class WhatsApp {

    constructor() {

        this.firebase = new Firebase();

        this.firebase.initAuth().then(res => {

            this.user = new User();

            let ref = User.findByEmail(res.user.email);

            ref.set({
                name: res.user.displayName,
                email: res.user.email,
                photo: res.user.photoURL
            }).then(() => {

                Prototype.elementsPrototype();

                this.loadElements();
    
                this.el.appContent.css({
                    display : 'flex'
                });
    
                this.events = new Events(this.el);

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