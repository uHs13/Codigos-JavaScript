export class Format {

    static toCamelCase(str) {

        let div = document.createElement("div");

        div.innerHTML = `<div data-${str} = "id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];

    }
    //.toCamelCase

    static formatMilliseconds(milliseconds) {

        let seconds = parseInt((milliseconds / 1000) % 60);

        let minutes = parseInt((milliseconds / (1000 * 60)) % 60);

        let hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    }
    // .formatMilliseconds

    static dateToTime(date, locale) {

        return date.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
        });

    }
    // .dateToTime

    static timeStampToTime(timestamp) {

        return (timestamp && typeof timestamp.toDate === 'function')
        ? Format.dateToTime(timestamp.toDate(), 'pt-BR')
        : '';

    }
    // .timeStampToTime

}
//.Format