function selectorAll(selector) {

    return document.querySelectorAll(selector);

}
// .selectorAll

function forEachSelector(selector, func = () => { }) {

    selectorAll(selector).forEach(func);

}
// .forEachSelector

function getEventTrDataSetJson(event) {

    let tr = event.path.find(el => {

        return (el.tagName.toUpperCase() === 'TR');

    });

    return JSON.parse(tr.dataset.row);

}
// .getEventTrDataSetJson