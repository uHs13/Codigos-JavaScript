const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyBMrEJqwaJDUBxKBRS_5dgrMcZ1c3sg-RU",
            authDomain: "whatsapp-clone-e8e4a.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-e8e4a.firebaseio.com",
            projectId: "whatsapp-clone-e8e4a",
            storageBucket: "whatsapp-clone-e8e4a.appspot.com",
            messagingSenderId: "223481550520",
            appId: "1:223481550520:web:4a312fccfe5a2ab6df064d",
            measurementId: "G-DZK4538FKP"
        };

        this.init();

    }
    // .constructor

    init() {

        if (!window._initializedFirebase) {

            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }

    }
    // .init

    static db() {

        return firebase.firestore();

    }
    // .db

    static hd() {

        return firebase.storage();

    }
    // .hd

    initAuth() {

        return new Promise((res, rej) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(response => {

                res({
                    user: response.user,
                    token: response.credential.accessToken
                });

            }).catch(error => {

                rej(error);

            });

        });

    }
    // .initAuth

}
// .Firebase