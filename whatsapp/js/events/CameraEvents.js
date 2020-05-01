export class CameraEvents {

    constructor(videoEl) {

        console.log(videoEl);

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

}
// .CameraEvents