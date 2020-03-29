class Utils {

    static addEventListenerAll(element, events, func) {

        events.split(" ").forEach(event => {

            element.addEventListener(event, func, true);

        });

    }
    //.addEventListenerAll

}