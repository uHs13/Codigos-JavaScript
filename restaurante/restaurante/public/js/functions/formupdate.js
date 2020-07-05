let formUpdate = document.querySelector('#form-update');

forEachSelector('.btn-update', btn => {

  btn.addEventListener('click', event => {

    let trData = getEventTrDataSetJson(event);

    for (let inputName in trData) {

      let input = formUpdate.querySelector(`[name = ${inputName}]`);

      switch (input.type.toLowerCase()) {

        case 'file':

          formUpdate.querySelector('img').src = `/${trData[inputName]}`;

          break;

        case 'date':

          input.value = moment(trData[inputName]).format('YYYY-MM-DD');

          break;

        default:

          input.value = trData[inputName];

          break;

      }

    }

    $('#modal-update').modal('show');

  });

});

formUpdate.send().then((response) => {

 window.location.reload();

});