/**
 * Funções com utilização de Eventos, arrow functions e funções anonimas;
 */
window.addEventListener('focus', event => {//arrow function

    console.log("MTA TRETA VISH");

});

document.addEventListener('click', event => {
    let date = new Date();
    console.log(`Hoje é dia ${date.toLocaleDateString("pt-BR")}`);

    let carros = ['uno', 'palio', 'bravo', 'siena', 'marea', '147/spazio', 'toro'];
    carros.forEach(function (value, index) { //O forEach é uma das funções nativas dos arrays. Dentro dele podemos declarar uma função anonima para iterar sobre todos os seus elementos;
        console.log(`${index} => ${value} `);//template string ``;
    });

});

let montadoras = new Array();

montadoras.push("Fiat", "Chevrolet", "Volkswagen", "Audi", "Renault", "Citroen", "Renault", "Chrysler", "Jeep", "Ford", "Mustang", "Ferrari", "Lamborghini");


montadoras.forEach(function (value, index) {
    console.log(`${index} => ${value}`);

});