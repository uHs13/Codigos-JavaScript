class MicrophoneEvents {

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

            this.changeMicrophoneTimer();

        });
        // .btnSendMicrophone

        this.elList.btnCancelMicrophone.on("click", () => {

            this.screen.changeDisplayMode("recordMicrophone");

            this.elList.btnSendMicrophone.show();

            this.clearMicrophoneTimerInterval();

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

}
// .MicrophoneEvents