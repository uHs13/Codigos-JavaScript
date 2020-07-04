class InputFileReader {

    constructor(fileInputEl, displayEl) {

        this.fileInputEl = fileInputEl;

        this.displayEl = displayEl;

        this.initInputEvent();

    }
    // .constructor

    initInputEvent() {

        document.querySelector(this.fileInputEl).addEventListener('change', event => {

            this.reader(event.target.files[0]).then(imgResult => {

                this.displayImgResult(imgResult);

            });

        });

    }
    // .initInputEvent

    reader(file) {

        return new Promise((res, rej) => {

            let reader = new FileReader();

            reader.onload = () => {

                res(reader.result);

            };

            reader.onerror = () => {

                rej(reader.error);

            };

            reader.readAsDataURL(file);

        });

    }
    // .reader

    displayImgResult(img) {

        document.querySelector(this.displayEl).src = img;

    }
    // .displayImgResult

}
// .InputFileReader