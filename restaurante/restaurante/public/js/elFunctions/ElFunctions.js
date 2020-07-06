class ElFunctions {

    static selectorAll(selector) {

        return document.querySelectorAll(selector);

    }
    // .selectorAll

    static forEachSelector(selector, func = () => { }) {

        ElFunctions.selectorAll(selector).forEach(func);

    }
    // .forEachSelector

    static getEventTrDataSetJson(event) {

        let tr = event.path.find(el => {

            return (el.tagName.toUpperCase() === 'TR');

        });

        return JSON.parse(tr.dataset.row);

    }
    // .getEventTrDataSetJson

}
// .ElFunctions