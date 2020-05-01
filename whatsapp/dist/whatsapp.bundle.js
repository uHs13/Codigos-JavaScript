/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Screen {

    constructor(elList) {

        this.elList = elList;

    }
    // .constructor

    changeDisplayMode(htmlIdinCamelCase) {

        let display = (eval(`this.elList.${htmlIdinCamelCase}`).style.display == "block");

        eval(`this.elList.${htmlIdinCamelCase}`).css({

            display: (display) ? "none" : "block"

        });

    }
    // .changeDisplayMode

    closeLeftSidePanel() {

        this.elList.panelEditProfile.hide();

        this.elList.paneSide.hide();

    }
    //.closeLeftSidePanel

    closeMenuAttach() {

        document.removeEventListener("click", this.closeMenuAttach);

        this.elList.menuAttach.removeClass("open");

    }
    // .closeMenuAttach

    closeAllMainPanel() {

        this.elList.panelMessagesContainer.hide();
        this.elList.panelCamera.removeClass('open');
        this.elList.panelDocumentPreview.removeClass('open');

    }
    // .closeAllMainPanel

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Screen;

// .Screen

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_WhatsApp__ = __webpack_require__(2);


window.app = new WhatsApp();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prototype_Prototype__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events_Events__ = __webpack_require__(4);



class WhatsApp {

    constructor() {

        __WEBPACK_IMPORTED_MODULE_0__prototype_Prototype__["a" /* Prototype */].elementsPrototype();

        this.loadElements();

        this.events = new __WEBPACK_IMPORTED_MODULE_1__events_Events__["a" /* Events */](this.el);

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
/* unused harmony export WhatsApp */

//.WhatsApp

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Prototype;

//.Prototype

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events_MicrophoneEvents__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events_ProfileEvents__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_ContactsEvents__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events_AttachEvents__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__events_MessageEvents__ = __webpack_require__(12);






class Events {

    constructor(el) {

        this.elList = el;

        this.microphoneEvents = new __WEBPACK_IMPORTED_MODULE_0__events_MicrophoneEvents__["a" /* MicrophoneEvents */](this.elList);

        this.profileEvents = new __WEBPACK_IMPORTED_MODULE_1__events_ProfileEvents__["a" /* ProfileEvents */](this.elList);

        this.contactsEvents = new __WEBPACK_IMPORTED_MODULE_2__events_ContactsEvents__["a" /* ContactsEvents */](this.elList);

        this.attachEvents = new __WEBPACK_IMPORTED_MODULE_3__events_AttachEvents__["a" /* AttachEvents */](this.elList);

        this.messageEvents = new __WEBPACK_IMPORTED_MODULE_4__events_MessageEvents__["a" /* MessageEvents */](this.elList);

    }
    //.constructor

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Events;

//.Events

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screen_Screen__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__time_Time__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__format_Format__ = __webpack_require__(7);




class MicrophoneEvents {

    constructor (elList) {

        this.elList = elList;

        this._micTimer;

        this.screen = new __WEBPACK_IMPORTED_MODULE_0__screen_Screen__["a" /* Screen */](this.elList);

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.voiceEvents();

    }
    // .bindEvents

    voiceEvents() {

        this.elList.btnSendMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.elList.btnSendMicrophone.hide();

            this.changeMicrophoneTimer();

        });
        // .btnSendMicrophone

        this.elList.btnCancelMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.elList.btnSendMicrophone.show();

            this.clearMicrophoneTimerInterval();

        });
        // .btnCancelMicrophone

        this.elList.btnFinishMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.clearMicrophoneTimerInterval();

            this.elList.btnSendMicrophone.show();

        });
        // .btnFinishMicrophone

    }
    // .voiceEvents

    changeMicrophoneTimer(timer = null) {

        let time = new __WEBPACK_IMPORTED_MODULE_1__time_Time__["a" /* Time */]();

        let start = time.getDate();

        if (timer == null) {

            this._micTimer = setInterval(() => {

                this.elList.recordMicrophoneTimer.innerHTML = __WEBPACK_IMPORTED_MODULE_2__format_Format__["a" /* Format */].formatMilliseconds(time.calcElapsedTime(start));

            }, 100);

        } else {

            this.elList.recordMicrophoneTimer.innerHTML = timer;

        }

    }
    // .changeMicrophoneTimer

    clearMicrophoneTimerInterval() {

        clearInterval(this._micTimer);

        this.changeMicrophoneTimer(0);

    }
    // .clarMicrophoneTimerInterval

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MicrophoneEvents;

// .MicrophoneEvents

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Time;

// .Time

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Format {

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

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Format;

//.Format

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screen_Screen__ = __webpack_require__(0);


class ProfileEvents {

    constructor(elList) {

        this.elList = elList;

        this.screen = new __WEBPACK_IMPORTED_MODULE_0__screen_Screen__["a" /* Screen */](this.elList);

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.profileEvents();

    }
    // .bindEvents

    profileEvents() {

        this.elList.myPhoto.on("click", () => {

            this.screen.closeLeftSidePanel();

            this.elList.panelEditProfile.show();

            setTimeout(() => {

                this.elList.panelEditProfile.addClass("open");

            }, 300);

        });
        //.myPhoto

        this.elList.btnClosePanelEditProfile.on("click", () => {

            this.elList.panelEditProfile.removeClass("open");

            this.elList.paneSide.show();

        });
        //.btnClosePanelEditProfile

        this.elList.photoContainerEditProfile.on("click", () => {

            this.elList.inputProfilePhoto.click();

        });
        //.photoContainerEditProfile

        this.elList.inputNamePanelEditProfile.on("keypress", e => {

            if (e.key === "Enter") {

                e.preventDefault();

                this.elList.btnSavePanelEditProfile.click();

            }

        });
        //.inputNamePanelEditProfile

        this.elList.btnSavePanelEditProfile.on("click", () => {

            console.log(this.elList.inputNamePanelEditProfile.innerHTML);

        });
        //.btnSavePanelEditProfile

    }
    // .profileEvents

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProfileEvents;

// .ProfileEvents

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screen_Screen__ = __webpack_require__(0);


class ContactsEvents {

    constructor(elList) {

        this.elList = elList;

        this.screen = new __WEBPACK_IMPORTED_MODULE_0__screen_Screen__["a" /* Screen */](this.elList);

        this.bindEvents()

    }
    // .constructor

    bindEvents() {

        this.contactsEvents();

    }
    // .bindEvents

    contactsEvents() {

        this.elList.btnNewContact.on("click", () => {
            // nova conversa

            this.screen.closeLeftSidePanel();

            this.elList.panelAddContact.show();

            setTimeout(() => {

                this.elList.panelAddContact.addClass("open");

            }, 300);

        });
        //.btnNewContact

        this.elList.btnClosePanelAddContact.on("click", () => {
            // fechar nova conversa

            this.elList.panelAddContact.hide();

            this.elList.paneSide.show();

        });
        //.btnClosePanelAddContact

        this.elList.formPanelAddContact.on("submit", (e) => {
            // botão submit nova conversa

            e.preventDefault();

            console.log(this.elList.formPanelAddContact.getJsonData());

        });
        // .formPanelAddContact

        this.elList.contactsMessagesList.querySelectorAll(".contact-item").forEach(contact => {
            //clique em um contato na lista de contatos.

            contact.on("click", () => {

                this.elList.home.hide();

                this.elList.main.css({

                    display: 'flex'

                });

            });

        });
        // .contactsMessagesList

    }
    // .contactsEvents

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContactsEvents;

// .ContactsEvents

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__screen_Screen__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events_CameraEvents__ = __webpack_require__(11);



class AttachEvents {

    constructor(elList) {

        this.elList = elList;

        this.screen = new __WEBPACK_IMPORTED_MODULE_0__screen_Screen__["a" /* Screen */](this.elList);

        this.cameraEvents;

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.btnAttachEvents();

    }
    // .bindEvents

    btnAttachEvents() {

        this.elList.btnAttach.on("click", (e) => {
            //botão anexar

            e.stopPropagation();
            // executa somente nessa camada. Os elementos ancestrais do btnAttach não vão receber os efeitos colaterais da função

            this.elList.menuAttach.addClass("open");

            document.addEventListener("click", this.screen.closeMenuAttach.bind(this));
            // Utilizando o bind para poder manter o escopo do this como a classe Event
            // dentro do document o this passaria a ser o próprio document, porém não queremos isso. Pra manter o escopo na classe Event usamos o bind.

        });
        // .btnAttach

        this.btnAttachPhotoEvents();

        this.btnAttachCameraEvents();

        this.btnAttachDocumentEvents();

        this.btnAttachContactEvents();

    }
    // .btnAttachEvents

    btnAttachPhotoEvents() {

        this.elList.btnAttachPhoto.on("click", () => {

            this.elList.inputPhoto.click();

        });
        // .btnAttachPhoto

        this.elList.inputPhoto.on("change", () => {

            //a lista de arquivos selectionados no input file é uma coleção que não pode ser iterada pelo forEach. Para percorrê-la temos que converter em array
            Array.from(this.elList.inputPhoto.files).forEach(file => {

                console.log(file);

            });

        });
        // .inputPhoto

    }
    // .btnAttachPhotoEvents

    btnAttachCameraEvents() {

        this.elList.btnAttachCamera.on("click", () => {

            this.screen.closeAllMainPanel();

            this.elList.panelCamera.css({
                height: 'calc(100% - 120px)'
            });

            this.elList.panelCamera.addClass('open');

            this.cameraEvents = new __WEBPACK_IMPORTED_MODULE_1__events_CameraEvents__["a" /* CameraEvents */](this.elList.videoCamera);

        });
        // .btnAttachCamera

        this.elList.btnClosePanelCamera.on('click', () => {

            this.screen.closeAllMainPanel();

            this.elList.panelMessagesContainer.show();

        });
        // .btnClosePanelCamera

        this.elList.btnTakePicture.on('click', () => {

            console.log('click-zum');

        });
        // .btnTakePicture

    }
    // .btnAttachCameraEvents

    btnAttachDocumentEvents() {

        this.elList.btnAttachDocument.on("click", () => {

            this.screen.closeAllMainPanel();

            this.elList.panelDocumentPreview.addClass('open');

            this.elList.panelDocumentPreview.css({
                height: 'calc(100% - 110px)'
            });

        });
        // .btnAttachDocument

        this.elList.btnClosePanelDocumentPreview.on("click", () => {

            this.closeAllMainPanel();

            this.elList.panelMessagesContainer.show();

        });
        // .btnClosePanelDocumentPreview

        this.elList.btnSendDocument.on("click", () => {

            console.log("Sending documents");

        });
        // .btnSendDocument

    }
    // .btnAttachDocumentsEvents

    btnAttachContactEvents() {

        this.elList.btnAttachContact.on("click", () => {

            this.elList.modalContacts.show();

        });
        // .btnAttachContact

        this.elList.btnCloseModalContacts.on("click", () => {

            this.elList.modalContacts.hide();

        });
        // .btnCloseModalContacts

    }
    // .btnAttachContactEvents


}
/* harmony export (immutable) */ __webpack_exports__["a"] = AttachEvents;

// .AttachEvents

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CameraEvents {

    constructor(videoEl) {

        console.log(videoEl);

        this.videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({

            video: true

        }).then(stream => {

            /**
             * Cria arquivos com formato binário, file ou blob. O atributo src dos elementos HTML não
             * conseguem ler streams, apenas links. Temos que convertê-lo para um formato interpretável,
             * com uma URL acessível.
             */
            this.videoEl.srcObject = stream;

            /**
             * Mostra na tela o que está sendo capturado pela câmera.
             */
            this.videoEl.play();

        }).catch(error => {

            console.error(error);

        });

    }
    // .constructor

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraEvents;

// .CameraEvents

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MessageEvents {

    constructor(elList) {

        this.elList = elList;

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.elList.inputText.on("keypress", (e) => {

            // keypress the event is going to happen

            if (e.key === "Enter" && !e.ctrlKey) {

                e.preventDefault();

                this.elList.btnSend.click();

            }

        });
        // inputText.keypress

        /* 'Input' new message. It´s an div with content editable */
        this.elList.inputText.on("keyup", () => {

            // keyup the event already happened

            if (this.elList.inputText.innerHTML.length > 0) {

                this.elList.inputPlaceholder.hide();

                this.changeSendOptions(true);

            } else {

                this.elList.inputPlaceholder.show();

                this.changeSendOptions(false);

            }

        });
        // inputText.keyup

        /* Btn send text message */
        this.elList.btnSend.on("click", () => {

            let message = this.elList.inputText.innerHTML;

            console.log(message);
            return;

        });
        // btnSend.click

        /* click to open and close the panel Emojis */
        this.elList.btnEmojis.on("click", () => {

            this.elList.panelEmojis.toggleClass("open");

        });
        // .btnEmojis.click

        /* click on a specific emoji

            in means inside
            on means above or atop or on top of

        */
        this.elList.panelEmojis.querySelectorAll(".emojik").forEach(emoji => {

            emoji.on("click", () => {

                /*
                * console.log(emoji.dataset.unicode);
                * Attribute data-x means dataset.x.
                */

                let img = this.elList.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach((cls) => {

                    img.classList.add(cls);

                });

                /* 
                    Insere após todos os caracteres digitados. Essa maneira não funciona corretamente para todas as vezes que o usuário
                    tentar inserir um emoji.
                */
                // this.elList.inputText.appendChild(img);

                /**
                 *  Retorna a posição atual do cursor do teclado na tela ou a posição da parte do texto que foi selecionada pelo usuário.
                 */
                let cursor = window.getSelection();

                /**
                 * É preciso saber se o cursor do teclado está focado em algum local. Caso não esteja ou esteja em outro lugar, jogamos seu
                 * foco para a div onde a mensagem é digitada
                 */
                if (!cursor.focusNode || !cursor.focusNode.id === 'input-text') {

                    // jogamos o foco na div da mensagem. Não é um input, é uma div com content editable
                    this.elList.inputText.focus();

                    cursor = window.getSelection();

                }

                /**
                 * Após posicionarmos o cursor do teclado dentro da div onde a mensagem é digitada precisamos saber qual a posição do cursor
                 * dentro dessa div e qual seu comportamento. Por exemplo, se o cursor está no inicio da mensagem, no meio, no final ou está
                 * selecionando algum trecho da mensagem. Em qualquer um desses casos o comportamento será adicionar um emoji na posição atual do
                 * cursor.
                 */
                // criando um variável que vai armazenar o range, a posição ou conjunto de posições no caso de seleção de texto, do cursor do teclado.
                let range = document.createRange();

                /**
                 * Atribuindo a posição inicial de onde o cursor está posicionado. Se estiver em um unico lugar será a posição atual, se for seleção
                 * de texto retorna onde foi iniciada.
                 */
                range = cursor.getRangeAt(0);

                /**
                 * Remove o que está dentro da seleção do cursor para que o conteudo possa ser substituido pelo emoji.
                 */
                range.deleteContents();

                /**
                 * Cria um fragmento que será adicionado no local onde o cursor do teclado está.
                 */
                let fragment = document.createDocumentFragment();

                /**
                 * Adiciona o emoji como conteudo do fragmento.
                 */
                fragment.appendChild(img);

                /**
                 * Insere o fragmento do range de seleção do cursor do teclado.
                 */
                range.insertNode(fragment);

                /**
                 * Define o novo inicio do cursor após o emoji adicionado.
                 */
                range.setStartAfter(img);

                /**
                 * Dispara o evento keyup do input text que tem como comportamento remover o texto que funciona como
                 * placeholder antes de ser inserido a mensagem.
                 */
                this.elList.inputText.dispatchEvent(new Event("keyup"));

            });

        });
        // .emojik.click

    }
    // .bindEvents

    changeSendOptions(textMessage) {

        if (textMessage) {

            this.elList.btnSendMicrophone.hide();

            this.elList.btnSend.show();

        } else {

            this.elList.btnSend.hide();

            this.elList.btnSendMicrophone.show();

        }

    }
    // .changeSendOptions

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MessageEvents;

// .MessageEvents

/***/ })
/******/ ]);