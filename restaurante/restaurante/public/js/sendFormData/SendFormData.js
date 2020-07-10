HTMLFormElement.prototype.send = function (functions) {

    let form = this;

    form.addEventListener('submit', event => {

        event.preventDefault();

        let formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData
        }).then(response => {

            response.json().then(json => {

                if (typeof functions.success === 'function') {

                    functions.success(json);

                }

            }).catch(error => {

                if (typeof functions.fail === 'function') {

                    functions.fail(error);

                }

            });

        });

    });

};