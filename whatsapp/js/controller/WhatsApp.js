import {Prototype} from '../prototype/Prototype';
import {Events} from '../events/Events';
import {Format} from '../format/Format';

export class WhatsApp {

    constructor() {

        Prototype.elementsPrototype();

        this.loadElements();

        this.events = new Events(this.el);

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