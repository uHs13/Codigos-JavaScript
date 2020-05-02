export class Document {

    constructor(file) {

        this.file = file;

    }
    // .constructor

    previewData() {

        return new Promise((resolve, reject) => {

            switch (this.file.type) {

                case 'image/gif':
                case 'image/png':
                case 'image/jpg':
                case 'image/bmp':
                case 'image/jpeg':
                case 'image/webp':

                    let reader =  new FileReader();

                    reader.onload = () => {

                        resolve({
                            src: reader.result,
                            title: this.file.name
                        });

                    }

                    reader.onerror = () => {

                        reject(reader.error);

                    }

                    reader.readAsDataURL(this.file);

                    break;

                case 'application/pdf':



                    break;

                default:

                    reject(this.file);

                    break;

            }
            // .switch

        });

    }
    // .previewData

}
// .Document