const pdfJs = require('pdfjs-dist');
const path = require('path');

console.log(path.resolve(
    __dirname, '../../dist/pdf.worker.bundle.js'
));

pdfJs.GlobalWorkerOptions.workerSrc = path.resolve(
    __dirname, '../../dist/pdf.worker.bundle.js'
);

export class Document {

    constructor(file) {

        this.file = file;

    }
    // .constructor

    previewData() {

        return new Promise((resolve, reject) => {

            let reader =  new FileReader();

            switch (this.file.type) {

                case 'image/gif':
                case 'image/png':
                case 'image/jpg':
                case 'image/bmp':
                case 'image/jpeg':
                case 'image/webp':

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

                    reader.onload = () => {

                        pdfJs.getDocument(new Uint8Array(reader.result)).then(pdf => {

                            pdf.getPage(1).then(page => {

                                let viewPort = page.getViewport(1);

                                let canvas = document.createElement('canvas');

                                let context = canvas.getContext('2d');

                                canvas.width = viewPort.width;
                                canvas.height = viewPort.height;

                                page.render({
                                    canvasContext: context,
                                    viewport: viewPort
                                }).then(() => {

                                    resolve({
                                        src: canvas.toDataURL('image/png'),
                                        title: `${pdf.numPages} página(s)`
                                    });

                                }).catch(error => {

                                    console.log('84');

                                    reject(error);

                                });

                            }).catch(error => {

                                console.log('92');

                                reject(error);

                            });

                        }).catch(error => {

                            console.log('100');

                            reject(error);

                        });

                    }

                    reader.onerror = () => {

                        console.log('110');

                        reject(reader.error);

                    }

                    reader.readAsArrayBuffer(this.file);

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