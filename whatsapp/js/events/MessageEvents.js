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
// .MessageEvents