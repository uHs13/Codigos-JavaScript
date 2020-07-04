HTMLFormElement.prototype.send = function () {

    let form = this;

    return new Promise((res, rej) => {

        form.addEventListener('submit', event => {

            event.preventDefault();

            let formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData
            }).then(response => {

                response.json().then(json => {

                    res(json);

                }).catch(error => {

                    rej(error);

                });

            });

        });

    });

};