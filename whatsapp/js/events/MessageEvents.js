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

                //console.log(emoji.dataset.unicode);
                // attribute data-x means dataset.x

                let img = this.elList.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach((cls) => {

                    img.classList.add(cls);

                });

                this.elList.inputText.appendChild(img);

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
// .MessageEvents