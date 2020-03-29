class Firebase {

    constructor(currentFolder) {

        this.currentFolder = [currentFolder];

        // Your web app's Firebase configuration
        this._firebaseConfig = {

            apiKey: "AIzaSyDybn1N0odnkUtuuR_XOlrapJsb9refrbE",
            authDomain: "the-project-d7219.firebaseapp.com",
            databaseURL: "https://the-project-d7219.firebaseio.com",
            projectId: "the-project-d7219",
            storageBucket: "the-project-d7219.appspot.com",
            messagingSenderId: "785869930274",
            appId: "1:785869930274:web:cb9acbbc53858136"

        };

        // Initialize Firebase
        firebase.initializeApp(this.firebaseConfig);

    }

    //--- GETTERS AND SETTERS ---//
    get firebaseConfig() {
        return this._firebaseConfig;
    }

    get firebaseDatabaseRef() {
        return firebase.database();
    }

    get firebaseStorage() {
        return firebase.storage();
    }

    //--- .GETTERS AND SETTERS ---//

    save(route, data) {

        this.firebaseDatabaseRef.ref(route).push().set(data);

    }
    //.save

    edit(route, data, id) {

        this.firebaseDatabaseRef.ref(route).child(id).set(data);

    }
    //.edit

    delete(route, id) {

        this.firebaseDatabaseRef.ref(route).child(id).remove();

    }
    //.delete

    newFolder(name) {

        this.firebaseDatabaseRef.ref(this.currentFolder.join("/")).push().set({

            name,
            type: "folder",
            path: this.currentFolder.join("/")

        });

    }
    //.newFolder

    removeFile(ref, name) {

        let pointer = this.firebaseStorage.ref(ref).child(name);

        return pointer.delete();

    }
    //.removeFile

    removeFolder(ref, name) {

        return new Promise((resolve, reject) => {

            let folderRef = this.firebaseDatabaseRef.ref(ref + "/" + name);

            folderRef.on("value", snapShot => {

                folderRef.off("value");

                snapShot.forEach(item => {

                    let data = item.val();

                    data.key = item.key;

                    if (data.type === "folder") {

                        this.removeFolder(ref + "/" + name, data.name).then(() => {

                            resolve({

                                fields: {

                                    key: data.key

                                }

                            });

                        }).catch(e => {

                            console.error(e);
                            reject(e);

                        });

                    } else if (data.type) {

                        this.removeFile(ref + "/" + name, data.name).then(() => {

                            resolve({

                                fields: {

                                    key: data.key

                                }

                            });

                        }).catch(e => {

                            console.error(e);
                            reject(e);

                        });

                    }

                });
                //.foreach

                folderRef.remove();

            });
            //.on("value")

        });
        //Promise

    }
    //.removeFolder

}