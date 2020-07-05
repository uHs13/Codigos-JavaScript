let formCreate = document.querySelector('#form-create');

formCreate.send().then(response => {

  window.location.reload();

});