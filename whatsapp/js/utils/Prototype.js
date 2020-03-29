class Prototype {

    static elementsPrototype() {

        //Prototype permite alter a estrutura de uma classe já existente
        //usando function porque precisamos limitar o escopo
        Element.prototype.hide = function () {

            this.style.display = "none";

            return this;

        }
        //.hide

        Element.prototype.show = function () {

            this.style.display = "block";

            return this;

        }
        //.show

        Element.prototype.toggle = function () {

            this.style.display = (this.style.display === "none") ? "block" : "none";

            return this;

        }
        //.toogle

        Element.prototype.on = function (events, func) {

            events.split(" ").forEach(event => {

                //arrow function não altera o escopo, logo o this continua sendo o elemento que está invocando o método
                this.addEventListener(event, func, true);

            });

            return this;

        }
        //.on

        Element.prototype.css = function (styles) {

            for (let style in styles) {

                this.style[style] = styles[style];

            }

            return this;

        }
        //.css

        Element.prototype.addClass = function (name) {

            this.classList.add(name);

            return this;

        }
        //.addClass

        Element.prototype.removeClass = function (name) {

            this.classList.remove(name);

            return this;

        }
        //.removeClass

        Element.prototype.toggleClass = function (name) {

            this.classList.toggle(name);

            return this;

        }
        //.toggleClass

        Element.prototype.hasClass = function (name) {

            return this.classList.contains(name);

        }
        //.hasClass

        HTMLFormElement.prototype.getData = function () {

            return new FormData(this);

        }
        // .getData

        HTMLFormElement.prototype.getJsonData = function () {

            let json = {};

            this.getData().forEach((value, key) => {

                json[key] = value;

            });

            return json;

        }
        // .getJsonData

    }
    //.elementsPrototype

}
//.Prototype