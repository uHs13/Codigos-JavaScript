export class CameraEvents {

    constructor(videoEl) {

        this.videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({

            video: true

        }).then(stream => {

            /**
             * Cria arquivos com formato binário, file ou blob. O atributo src dos elementos HTML não
             * conseguem ler streams, apenas links. Temos que convertê-lo para um formato interpretável,
             * com uma URL acessível.
             */
            this.videoEl.srcObject = stream;

            /**
             * Alimentando um atributo para ter acesso ao stream fora do seu escopo
             */
            this.stream = stream;

            /**
             * Mostra na tela o que está sendo capturado pela câmera.
             */
            this.videoEl.play();

        }).catch(error => {

            console.error(error);

        });

    }
    // .constructor

    stopCamera() {

        this.stream.getTracks().forEach(track => {

            track.stop();

        });

    }
    // .stopCamera

    takePicture(mimeType = 'image/png') {

        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this.videoEl.videoHeight);
        canvas.setAttribute('width', this.videoEl.videoWidth);

        let context = canvas.getContext('2d');

        context.drawImage(this.videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);

    }
    // .takePicture

    static convertBase64inImage(base64) {

        return new Promise((res, rej) => {

            let regex = /^data:(.+);base64,(.*)$/;

            let result = base64.match(regex);

            let mimeType = result[1];

            let ext = mimeType.split('/')[1];

            let fileName = `camera${Date.now()}.${ext}`;

            CameraEvents.flipXImage(base64).then(canvas => {

                fetch(canvas.toDataURL(mimeType)).then(bytes => {

                    return bytes.arrayBuffer();
    
                }).then(buffer => {
    
                    res(new File(
                        [buffer],
                        fileName,
                        {
                            type: mimeType
                        }
                    ));
    
                });

            });

        });

    }
    // .convertBase64inImage

    static flipXImage(base64) {

        return new Promise((res, rej) => {

            let picture = new Image();
        
            picture.src = base64;

            picture.onload = () => {

                let canvas = document.createElement('canvas');

                let context = canvas.getContext('2d');

                canvas.width = picture.width;
                canvas.height = picture.height;

                context.translate(picture.width, 0);
                context.scale(-1, 1);

                context.drawImage(picture, 0, 0, canvas.width, canvas.height);

                res(canvas);

            };

        });

    }
    // .flipXImage

}
// .CameraEvents