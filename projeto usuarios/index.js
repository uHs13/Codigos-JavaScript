/*
let name = document.querySelector("#exampleInputName");
let gender = document.querySelectorAll("#form-user-create [name=gender]:checked");//como os botões de selecionar o sexo são radio buttons eles compatilham o mesmo nome (devem ter o mesmo nome para podermos pegar somente o que foi selecionado pelo usuário). Como name não é um seletor com símbolo como o id(#) e class(.), devemos pesquisá-lo colocando colchetes. Procure dentro do form-user-create algum elemento com o name == gender e esteja selecionado (:checked é um pseudoseletor do CSS3); 
let birth = document.querySelector("#exampleInputBirth");//querySelector só retorna um item. Para retornar mais de um que compartilha a mesma classe ou id devemos usar o querySelectorAll();
let country = document.querySelector("#exampleInputCountry");
let email = document.querySelector("#exampleInputEmail");
let password = document.querySelector("#exampleInputPassword");
let photo  = document.querySelector("#exampleInputFile");
let admin = document.querySelector("#exampleInputAdmin");

let array = new Array();
array.push(name,gender,birth,country,email,password,photo,admin);
console.log(array);
*/ //Fazendo dessa maneira o código fica muito específico e quebra um dos pricipais pilares da pogramação que é a abstração. Para melhorar e abstrair esse código podemos fazer um forEach percorrendo todo o formulário e encontrando os seus campos;

let userController = new UserController("#form-user-create","#form-user-update","#table-users",2);
//nome de variável com a primeira letra minúscula e nome de classe com a primeira maiúscula;

