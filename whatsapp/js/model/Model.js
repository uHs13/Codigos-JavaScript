import { Event } from "../events/Event";

export class Model extends Event{

    constructor() {

        super();

        this._data = {};

    }
    // .constructor

    fromJSON(json) {

        this._data = Object.assign(this._data, json);

        this.trigger('datachange', this.toJSON());

    }
    // .fromJSON

    toJSON() {
        return this._data;
    }
    // .toJSON

}
// .Model