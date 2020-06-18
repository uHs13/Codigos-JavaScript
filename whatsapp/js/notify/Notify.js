import { ContactsEvents } from "../events/ContactsEvents";
import { MessageEvents } from "../events/MessageEvents";

export class Notify {

    constructor (elList, firebaseUserInstance) {

        this.elList = elList;

        this.user = firebaseUserInstance;

    }
    // .constructor

    checkNotifications() {

        /**
         * Checando suporte do navegador a API de
         * notificações.
         */

        if (typeof Notification === 'function') {

            /**
             * Conferindo se o usuário já concedeu
             * as devidas permissões ao envio de 
             * notificações.
             */

            console.log(Notification.permission);

            if (Notification.permission !== 'granted') {

                this.elList.alertNotificationPermission.show();

            } else {

                this.elList.alertNotificationPermission.hide();

            }

            this.elList.alertNotificationPermission.on('click', () => {

                Notification.requestPermission().then(permission => {

                    if (permission === 'granted') {

                        this.elList.alertNotificationPermission.hide();

                        console.info('User permission granted');

                    }

                });

            });

        }

    }
    // .checkNotifications

    notification(data) {

        if (Notification.permission === 'granted' && !MessageEvents.sendActiveState()) {

            let contact = ContactsEvents.sendActiveContact();

            let notification = new Notification(
                contact.name,
                {
                    icon: contact.photo,
                    body: data.content
                }
            );

            setTimeout(() => {

                if (notification) notification.close();

            }, 3000);

        }

    }
    // .notification

}
// .Notify