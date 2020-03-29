class Montadoras{// Classses :)

    constructor(){
        this.nomes = new Array();
    }

    addNome(nome){
        this.nomes.push(nome);
    }

    mostraNome(){
        this.nomes.forEach(function(value,index){
            console.log(`${index} => ${value}`);
        });
    }




}

let montadoras = new Montadoras();
montadoras.addNome("Fiat");
montadoras.addNome("Chevrolet");
montadoras.addNome("Chyrsler");
montadoras.addNome("Jeep");
montadoras.addNome("Renault");
montadoras.mostraNome();
