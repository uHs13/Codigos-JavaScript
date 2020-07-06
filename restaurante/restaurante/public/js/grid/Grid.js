class Grid {

    constructor(configurationJson) {

        configurationJson.listeners = Object.assign(
            {
                afterUpdateClick: (e) => {

                    $('#modal-update').modal('show');

                }
            },
            configurationJson.listeners
        )

        this.options = Object.assign(
            {},
            {
                formCreate: '#form-create',
                formUpdate: '#form-update',
                btnUpdate: '.btn-update',
                btnDelete: '.btn-delete',
            },
            configurationJson,
        );

        this.initForms();

        this.initButtons();

    }
    // .constructor

    initForms() {

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.send().then(response => {

            window.location.reload();

        });

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.send().then((response) => {

            window.location.reload();

        });

    }
    // .initForms

    triggerEvent(eventName, argument) {

        if (typeof this.options.listeners[eventName] === 'function') {

            this.options.listeners[eventName].apply(this, argument);

        }

    }
    // .triggerEvent

    initButtons() {

        ElFunctions.forEachSelector(this.options.btnUpdate, btn => {

            btn.addEventListener('click', event => {

                this.triggerEvent('afterUpdateClick', [event]);

                let trData = ElFunctions.getEventTrDataSetJson(event);

                for (let inputName in trData) {

                    let input = this.formUpdate.querySelector(`[name = ${inputName}]`);

                    switch (input.type.toLowerCase()) {

                        case 'file':

                            this.formUpdate.querySelector('img').src = `/${trData[inputName]}`;

                            break;

                        case 'date':

                            input.value = moment(trData[inputName]).format('YYYY-MM-DD');

                            break;

                        default:

                            input.value = trData[inputName];

                            break;

                    }

                }

                this.triggerEvent('beforeUpdateClick', [event]);

            });

        });

        ElFunctions.forEachSelector(this.options.btnDelete, btn => {

            btn.addEventListener('click', event => {

                let trData = ElFunctions.getEventTrDataSetJson(event);

                if (confirm(eval('`' + this.options.deleteMsg + '`'))) {

                    fetch(eval('`' + this.options.deleteUrl + '`'), {
                        method: 'DELETE'
                    }).then(response => {

                        response.json().then(() => {

                            window.location.reload();

                        });

                    });

                }

            });

        });

    }
    // .initButtons

}
// .Grid