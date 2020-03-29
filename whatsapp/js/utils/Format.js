class Format {

    static toCamelCase(str) {

        let div = document.createElement("div");

        div.innerHTML = `<div data-${str} = "id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];

    }
    //.toCamelCase

}
//.Format