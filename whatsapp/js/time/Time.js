class Time {

    constructor() {



    }
    // .construtor

    getDate() {

        return new Date();

    }
    // .getDate

    calcElapsedTime(date) {

        return Date.now() - date;

    }
    // .calcElapsedTime

}
// .Time