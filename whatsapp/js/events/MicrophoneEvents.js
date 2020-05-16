import {Screen} from '../screen/Screen';
import {Time} from '../time/Time';
import {Format} from '../format/Format';

export class MicrophoneEvents {

    constructor (elList) {

        this.elList = elList;

        this._micTimer;

        this.screen = new Screen(this.elList);

        this.bindEvents();

    }
    // .constructor

    bindEvents() {

        this.voiceEvents();

    }
    // .bindEvents

    voiceEvents() {

        this.elList.btnSendMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.elList.btnSendMicrophone.hide();

            try {

                this.recordMicrophoneAudio();

                this.changeMicrophoneTimer();

            } catch (error) {

                console.error(error);

            }

        });
        // .btnSendMicrophone

        this.elList.btnCancelMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.elList.btnSendMicrophone.show();

            this.clearMicrophoneTimerInterval();

            this.stopRecordMicrophoneAudio();

        });
        // .btnCancelMicrophone

        this.elList.btnFinishMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.clearMicrophoneTimerInterval();

            this.elList.btnSendMicrophone.show();

        });
        // .btnFinishMicrophone

    }
    // .voiceEvents

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

    clearMicrophoneTimerInterval() {

        clearInterval(this._micTimer);

        this.changeMicrophoneTimer(0);

    }
    // .clarMicrophoneTimerInterval

    recordMicrophoneAudio() {

        navigator.mediaDevices.getUserMedia({

            audio: true

        }).then(stream => {

            /**
             * Alimentando um atributo para ter acesso ao stream fora do seu escopo
             */
            this.stream = stream;

            let audio = new Audio();

            audio.srcObject = stream;

            audio.play();

        }).catch(error => {

            console.error(error);

        });

    }
    // .recordMicrophoneAudio

    stopRecordMicrophoneAudio() {

        this.stream.getTracks().forEach(track => {

            track.stop();

        });

    }
    // .stopRecordMicrophoneAudio

}
// .MicrophoneEvents