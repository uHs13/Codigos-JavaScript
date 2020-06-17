import {Firebase} from './../firebase/Firebase';

export class Upload {

    static send(from, file) {

        return new Promise((res, rej) => {

            let uploadTask = Upload.uploadToStorage(from, file);

            uploadTask.on('state_changed', e => {

                console.info('upload', e);

            }, error => {

                console.error(error);

                rej(error);

            }, () => {

                res(uploadTask.snapshot);

            });

        });

    }
    // .send

    static uploadToStorage(from, file) {

        return Firebase.hd()
        .ref(from)
        .child(`${Date.now()}_${file.name}`)
        .put(file);

    }
    // .uploadToStorage

}
// .Upload