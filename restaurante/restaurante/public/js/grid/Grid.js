class Grid {

    constructor(configurationJson) {

        configurationJson.listeners = Object.assign(
            {
                afterUpdateClick: (e) => {

                    $('#modal-update').modal('show');

                },
                afterDeleteClick: () => {

                    window.location.reload();

                },
                afterFormCreate: (response) => {

                    window.location.reload();

                },
                afterFormUpdate: (response) => {

                    window.location.reload();

                },
                afterFormCreateError: (e) => {

                    alert('Erro ao enviar o formulário');

                },
                afterFormUpdateError: (e) => {

                    alert('Erro ao enviar o formulário');

                },
            },
            configurationJson.listeners
        );

        this.options = Object.assign(
            {},
            {
                formCreate: '#form-create',
                formUpdate: '#form-update',
                btnUpdate: 'btn-update',
                btnDelete: 'btn-delete',
            },
            configurationJson,
        );

        this.rows = [...ElFunctions.selectorAll('table tbody tr')];

        this.initForms();

        this.initButtons();

    }
    // .constructor

    initForms() {

        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.send().then(response => {

           this.triggerEvent('afterFormCreate', [response]);

        }).catch(error => {

            this.triggerEvent('afterFormCreateError', [error]);

        });

        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.send().then((response) => {

           this.triggerEvent('afterFormUpdate', [response]);

        }).catch(error => {

            this.triggerEvent('afterFormCreateError', [error]);

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

        this.rows.forEach(row => {

            [...row.querySelectorAll('.btn')].forEach(btn => {

                btn.addEventListener('click', event => {

                    if (event.target.classList.contains(this.options.btnUpdate)) {

                        this.btnUpdateClick(event);

                    } else if (event.target.classList.contains(this.options.btnDelete)) {

                        this.btnDeleteClick(event);

                    } else {

                        this.triggerEvent(
                            'buttonClick',
                            [
                                event.target,
                                ElFunctions.getEventTrDataSetJson(event),
                                event
                            ]
                        );

                    }

                });

            });

        });

    }
    // .initButtons

    btnUpdateClick(event) {

        this.triggerEvent('beforeUpdateClick', [event]);

        let trData = ElFunctions.getEventTrDataSetJson(event);

        for (let fieldName in trData) {

            this.options.onUpdateLoad(this.formUpdate, fieldName, trData);

        }

        this.triggerEvent('afterUpdateClick', [event]);

    }
    // .btnUpdateClick

    btnDeleteClick(event) {

        let trData = ElFunctions.getEventTrDataSetJson(event);

        if (confirm(eval('`' + this.options.deleteMsg + '`'))) {

            fetch(eval('`' + this.options.deleteUrl + '`'), {
                method: 'DELETE'
            }).then(response => {

                response.json().then(() => {

                    this.triggerEvent('afterDeleteClick');

                });

            });

        }

    }
    // .btnDeleteClick

}
// .Grid