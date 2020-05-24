import { Screen } from '../screen/Screen';
import { Time } from '../time/Time';
import { Format } from '../format/Format';
import { Event } from './Event';

export class MicrophoneEvents extends Event {

    constructor(elList) {

        super();

        this.elList = elList;

        this._micTimer;

        this._mediaRecorder;

        this._recordedChunks = [];

        this._mimeType = 'audio/webm';

        this.screen = new Screen(this.elList);

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.voiceEvents();

    }
    // .bindEvents

    initMicrophoneAudio() {

        return new Promise((res, rej) => {

            navigator.mediaDevices.getUserMedia({

                audio: true

            }).then(stream => {

                /**
                 * Alimentando um atributo para ter acesso ao stream fora do seu escopo
                 */

                this.stream = stream;

                res(this.stream);

            }).catch(error => {

                rej(error);

            });

        });

    }
    // .initMicrophoneAudio

    voiceEvents() {

        this.elList.btnSendMicrophone.on("click", () => {

            /**
             * Método com promessa que retorna o object stream se o usuario
             * permite a gravação do microfone.
             */
            this.initMicrophoneAudio().then((res) => {

                if (res) {

                    this.elList.btnSendMicrophone.hide();

                    this.screen.changeDisplayMode("recordMicrophone");

                    this.startRecorder();

                }

            });

        });
        // .btnSendMicrophone

        this.elList.btnCancelMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.elList.btnSendMicrophone.show();

            this.stopRecorder();

        });
        // .btnCancelMicrophone

        this.elList.btnFinishMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.stopRecorder();

            this.elList.btnSendMicrophone.show();

        });
        // .btnFinishMicrophone

    }
    // .voiceEvents

    clearMicrophoneTimerInterval() {

        clearInterval(this._micTimer);

        this.changeMicrophoneTimer(0);

    }
    // .clarMicrophoneTimerInterval

    stopMicrophoneAudio() {

        this.stream.getTracks().forEach(track => {

            track.stop();

        });

    }
    // .stopMicrophoneAudio

    startRecorder() {

        this._mediaRecorder = new MediaRecorder(this.stream, {
            mimeType: this._mimeType 
        });

        /**
         * Reiniciando os valores gravados para
         * armazenar apenas os chunks do audio atual.
         */
        this._recordedChunks = [];

        this._mediaRecorder.addEventListener('dataavailable', stream => {

            if (stream.data.size > 0) {

                this._recordedChunks.push(stream.data);

            }

        });

        this._mediaRecorder.addEventListener('stop', () => {

            /**
             * Blob - Binary Large Object
             */

            let blob = new Blob(this._recordedChunks, {
                type: this._mimeType
            });

            let fileName = `userRecord${Date.now()}`;

            let file = new File([blob], fileName, {

                type: this._mimeType,
                lastModified: Date.now()

            });

            console.log(file);

            let reader = new FileReader();
            
            reader.onload = e => {

                let audio = new Audio(reader.result);

                audio.play();

            };

            reader.readAsDataURL(file);

        });

        this._mediaRecorder.start();

        this.changeMicrophoneTimer();

    }
    // .startRecorder

    stopRecorder() {

        this._mediaRecorder.stop();

        this.stopMicrophoneAudio();

        this.clearMicrophoneTimerInterval();

    }
    // .stopRecorder

    changeMicrophoneTimer(timer = null) {

        let time = new Time();

        let start = time.getDate();

        if (timer == null) {

            this._micTimer = setInterval(() => {

                this.elList.recordMicrophoneTimer.innerHTML = Format.formatMilliseconds(time.calcElapsedTime(start));

            }, 100);

        } else {

            this.elList.recordMicrophoneTimer.innerHTML = timer;

        }

    }
    // .changeMicrophoneTimer

}
// .MicrophoneEvents