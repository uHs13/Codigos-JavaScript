export class Event {

    constructor() {

        this.events = {};

    }
    // .constructor

    on(eventName, func) {

        if (!this.events[eventName]) this.events[eventName] = new Array();

        this.events[eventName].push(func);

    }
    // .on

    trigger() {

        // conversao para array: [..x] spread;
        let args = [...arguments];
        let eventName = args.shift();

        args.push(new Event(eventName));

        if (this.events[eventName] instanceof Array) {

            this.events[eventName].forEach(func => {

                func.apply(null, args);

            });

        }

    }
    // .trigger

}
// .Event