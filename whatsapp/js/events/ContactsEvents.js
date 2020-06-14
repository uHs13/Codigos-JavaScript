import { Screen } from "../screen/Screen";
import { Chat } from "../model/Chat";
import { User } from "../model/User";
import { Message } from "../model/Message";

export class ContactsEvents {

    constructor(elList, firebaseUserInstance) {

        this.elList = elList;

        this.screen = new Screen(this.elList);

        this.user = firebaseUserInstance;

        this.initContacts();

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.contactsEvents();

    }
    // .bindEvents

    initContacts() {

        this.user.getContacts();

        this.user.on('contactsChange', docs => {

            this.elList.contactsMessagesList.innerHTML = '';

            docs.forEach(doc => {

                let contact = doc.data();

                let div = document.createElement('div');

                div.classList.add('contact-item');

                div.innerHTML = `
                    <div class="dIyEr">
                        <div class="_1WliW" style="height: 49px; width: 49px;">
                            <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                            <div class="_3ZW2E">
                                <span data-icon="default-user" class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                        <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                        <g fill="#FFF">
                                            <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="_3j7s9">
                        <div class="_2FBdJ">
                            <div class="_25Ooe">
                                <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                            </div>
                            <div class="_3Bxar">
                                <span class="_3T2VG">${contact.lastMessageTime}</span>
                            </div>
                        </div>
                        <div class="_1AwDx">
                            <div class="_itDl">
                                <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                                <span class="_2_LEW last-message">
                                    <div class="_1VfKB">
                                        <span data-icon="status-dblcheck" class="">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                                    <div class="_3Bxar">
                                        <span>
                                            <div class="_15G96">
                                                <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                            </div>
                                    </span></div>
                                    </span>
                            </div>
                        </div>
                    </div>
                `;

                if (contact.photo) {

                    let img = div.querySelector('.photo');
                    img.src = contact.photo;
                    img.show();

                }

                div.on('click', () => {

                    this.setActiveContact(contact);

                });

                this.elList.contactsMessagesList.appendChild(div);

            });

        });

    }
    // .initContacts

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

            let formData = new FormData(this.elList.formPanelAddContact);

            Chat.create(this.user.email, formData.get('email')).then(chat => {

                this.user.addContact(formData.get('email'), chat.id).then(res => {

                    let contact = new User({
                        email: formData.get('email')
                    });

                    contact.addContact(this.user.email, chat.id).then(res => {

                        this.user.getContacts();

                        this.elList.btnClosePanelAddContact.click();

                    });

                }).catch(error => {

                    console.error(error);

                });

            }).catch(error => {

                console.error(error);

            });

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

        this.elList.inputSearchContacts.on('keyup', () => {

            if (this.elList.inputSearchContacts.value.length > 0) {

                this.elList.inputSearchContactsPlaceholder.hide();

            } else {

                this.elList.inputSearchContactsPlaceholder.show();

            }

            this.user.getContacts(this.elList.inputSearchContacts.value);

        });

    }
    // .contactsEvents

    setActiveContact(contact) {

        if (this.activeContact) {

            Message.getRef(this.activeContact.chatId)
            .orderBy('timeStamp')
            .onSnapshot(() => {});

        }

        this.activeContact = contact;

        this.elList.activeName.innerHTML = contact.name;
        this.elList.activeStatus.innerHTML = contact.status;

        if (contact.photo) {

            let img = this.elList.activePhoto;
            img.src = contact.photo;
            img.show();

        }

        this.elList.home.hide();

        this.elList.main.css({
            display: 'flex'
        });

        this.elList.panelMessagesContainer.innerHTML = '';

        Message.getRef(this.activeContact.chatId)
        .orderBy('timeStamp')
        .onSnapshot(docs => {

            /**
             * O painel de mensagens tem uma altura fixa. A partir do momento que a altura
             * do conteúdo ultrapassa esse valor fixo a propriedade overflow-y do css cria
             * uma barra de rolagem vertical para podermos acompanhar o conteúdo sem alte-
             * rar a altura fixa do painel.
             * 
             * scrollHeight: altura total do conteúdo do painel
             * offsetHeight: altura fixa do painel
             * scrollTop: distância do inicio do conteúdo ao ponto atual do scroll
             * 
             * valor máximo de rolagem: scrollHeight - offsetHeight
             * valor máximo que é possível rolar o painel de mensagens
             * 
             * Se o ponto atual do scroll for a igual a scrollTop, barra de rolagem encosta-
             * da no final do conteúdo, a rolagem tem que ocorrer automaticamente. Se for um
             * valor menor a barra de rolagem deve permanecer no local onde está.
             * 
             */

            let scrollTop = this.elList.panelMessagesContainer.scrollTop;
            let scrollTopMax = (
                this.elList.panelMessagesContainer.scrollHeight -
                this.elList.panelMessagesContainer.offsetHeight
            );
            
            /**
             * Se for maior significa que a barra de rolagem está no final.
             * A cada nova mensagem a barra de rolagem tem que ser reajusta-
             * da para o final. Se a comparação retornar false quer dizer
             * que a barra de rolagem está acima do final.
             */
            let autoScroll = (scrollTop >= scrollTopMax);    

            docs.forEach(doc => {

                let data = doc.data();
                data.id = doc.id;

                let message = new Message();
                message.fromJSON(data);

                let me = (data.from === this.user.email);

                if (!this.elList.panelMessagesContainer.querySelector(`#_${data.id}`)) {

                    if (!me) {

                        doc.ref.set({
                            status: 'read'
                        }, {
                            merge: true
                        });

                    }

                    let view = message.getViewElement(me);

                    this.elList.panelMessagesContainer.appendChild(view);

                } else {

                    let view = message.getViewElement(me);

                    this.elList.panelMessagesContainer.querySelector(`#_${data.id}`).innerHTML =
                    view.innerHTML;

                }

                if (this.elList.panelMessagesContainer.querySelector(`#_${data.id}`) && me) {

                    let msgEl = this.elList.panelMessagesContainer.querySelector(`#_${data.id}`)

                    msgEl.querySelector('.message-status').innerHTML =
                    message.getStatusViewElement().outerHTML;

                }

            });

            if (autoScroll) {

                this.elList.panelMessagesContainer.scrollTop = (
                this.elList.panelMessagesContainer.scrollHeight -
                this.elList.panelMessagesContainer.offsetHeight
                );

            } else {

                this.elList.panelMessagesContainer.scrollTop = scrollTop;

            }

        });

    }
    // .setActiveContact

    static sendActiveContact() {

        return window.app.events.contactsEvents.activeContact;

    }
    // .sendActiveContact

}
// .ContactsEvents