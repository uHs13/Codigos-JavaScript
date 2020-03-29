class UserController {
    //Recebemos o id do formulário que queremos controlar
    
    constructor(formId, formIdUpdate, tableId,storageType) {

        this.formEl = document.querySelector(formId);//Guarda o formulário de cadastro
        this.formUpdateEl = document.querySelector(formIdUpdate);//Guarda o formulário de edição
        this.tableEl = document.querySelector(tableId);//Guarda o tbody da tabela onde vamos adicionar os usuários;
        this._storageType = storageType;//Guarda o tipo de storage que vai ser usado, 1 pra session e 2 pra local;
        // console.log('construtor:'+this._storageType);

        this.onSubmit();
        this.onEdit();
        this.listUsersStored();

    }//Fim constructor. É uma boa prática colocar o nome do método que a chave está fechando para não fazermos confusão de chaves;

    get storageType(){

        // console.log('get:'+ this._storageType);
        return this._storageType;

    }

    onSubmit() {//Função que retira o comportamento default do botão salvar ( recarregar a página ) e adiciona os dados adicionados no formulário na tabela;

        //Não adianta pegar os dados do formulário assim que a página carrega, não teria nada nos inputs. Fazendo dessa maneira apenas adicionamos o conteúdo dos campos do formulário depois que o usuário clica no botão enviar;
        Utils.addEventListenerAll(this.formEl, 'submit', event => {//arrow function previne conflito de escopo. Event é um parâmetro da arrow function ( quando é um só não precisa de parênteses) e não o nome dela;
            //sempre colocar # antes do nome do id. # indica que é um id e . indica que é uma classe;
            event.preventDefault();//preventDefault() cancela o comportamento padrão do evento passado no addEventListener, no caso do submit a página não é recarregada;

            let values = this.getValues(this.formEl);//Captura os dados preenchidos no formulário e os adiciona em um objeto do tipo User;

            let btn = this.formEl.querySelector("[type=submit]");//Procura no documento ( index.html ) um elemento com o type=submit, no caso o botão do formulário ( é o unico botão com type=submit);

            btn.disabled = true;//Temos que desabilitar o botão para o usuário não ficar clicando várias vezes no botão e isso gerar erros;

            if (values) {//Se os valores do formulário tiverem sido capturados sem nenhum problema, todos os campos preeenchidos corretamente. Podemos fazer essa comparação por valor booleano porque a função getValues retorna false se tiver algum campo obrigatório vazio;

                this.getPhoto(this.formEl).then(//Como estamos trabalhando com Promise no getPhoto precisamos usar o then() que tem como parâmetro duas funçãoes, uma que é executada caso tudo ocorra bem dentro do promisse e outra que será executada caso a Promise retorne um erro;

                    resolve => {//Caso dê tudo certo

                        //pegamos o conteúdo da foto, retornado no resolve da Promise dentro do getPhoto(), e adicionamos no atributo photo do nosso objeto User que é retornado pelo getValues;
                        values.photo = resolve;

                        //Antes de passar o valor pro método addLine colocar na tabela temos que salvar na sessionStorage ou localStorage
                        // console.log('promise:'+this.storageType);
                        values.save(this.storageType);//podemos chamar o método save nessa variável porque o método get values retorna um novo usuário

                        //somente após values ter sido sobreescrevida podemos exibir o novo usuário na linha da tabela; 
                        this.addLine(values);

                        this.resetForm(this.formEl, btn);
                    },

                    reject => {//Se retornar um erro ele será monstrado no console;

                        console.error(reject);//console.error('msg'); Exibe a msg em formato de erro;

                    }

                );
            }
        });

    }//Fim onSubmit

    onEdit() {

        //Capturamos o botão cancelar do formulário de edição
        let btn = document.querySelector("#box-user-update .btn-cancel");

        //Quando clicarmos em cancelar o formulário de cadastro volta a aparecer
        Utils.addEventListenerAll(btn, 'click drag', f => {

            this.showRegisterForm();

        });

        //Definindo o evento quando clicamos no botão de salvar 
        Utils.addEventListenerAll(this.formUpdateEl, 'submit', event => {

            event.preventDefault();

            let values = this.getValues(this.formUpdateEl);//Captura os dados preenchidos no formulário e os adiciona em um objeto do tipo User;

            //console.log(values);

            let btn = this.formUpdateEl.querySelector("[type=submit]");//Procura no documento ( index.html ) um elemento com o type=submit, no caso o botão do formulário ( é o unico botão com type=submit);

            btn.disabled = true;//Temos que desabilitar o botão para o usuário não ficar clicando várias vezes no botão e isso gerar erros;

            //Capturamos o indice da linha na variável do dataset
            let index = this.formUpdateEl.dataset.trIndex;

            //Guardamos a linha específica que vai ser editada. Fazemos isso porque não queremos criar uma nova linha, apenas editar o conteúdo de uma já existente e exibir a mesma linha com as alterações já feitas
            let tr = this.tableEl.rows[index];
            //acessamos o tbody da tabela e capturamos o valor no dataset da linha específica que está sendo editada para saber onde aplicar as mudanças

            //Objeto antigo que contém todas as informações salvas no dataset da linha que está sendo editada, inclusive a foto
            let userOld = JSON.parse(tr.dataset.user);


            //Combinação do objeto antigo com o novo ( formado a partir dos dados recolhidos do formulário );
            let result = Object.assign({}, userOld, values);
            //os valores de userOld são sobreescritos pelos de value, a combinação é colocada no novo objeto {}. Como o values não tem a foto ( não mexemos no case 'file' do addEventsTr() ) é necesário fazer isso; 


            this.getPhoto(this.formUpdateEl).then(//Como estamos trabalhando com Promise no getPhoto precisamos usar o then() que tem como parâmetro duas funções, uma que é executada caso tudo ocorra bem dentro da promisse e outra que será executada caso a Promise retorne um erro;

                resolve => {//Caso dê tudo certo

                    //Substitui o valor vazio da foto pela foto que o usuário já tem
                    if (!values.photo) {
                        result._photo = userOld._photo
                    } else {
                        //Se houver uma troca de foto temos que adicionar a nova;
                        result._photo = resolve;

                    }

                    let user = new User();

                    user.loadFromJSON(result);//Precisamos carregar os dados do json result em um objeto User porque a função getTr trabalha somente com objetos User

                    //salvamos os novos dados no storage
                    user.save(this.storageType);
                    
                    //Estamos passando a tr que criamos lá em cima, tr que guarda a linha que está sendo editada, porque não queremos que uma nova linha seja criada, apenas atualizamos as informações
                    this.getTr(user,tr);
                   
                    //Atualiza as estatísticas após a edição
                    this.updateCount();

                    //limpa o formulário e destrava o salvar
                    this.resetForm(this.formUpdateEl, btn);

                    this.showRegisterForm();
                },

                reject => {//Se retornar um erro ele será monstrado no console;

                    console.error(reject);//console.error('msg'); Exibe a msg em formato de erro;

                }

            );

        });

    }//Fim onEdit

    getPhoto(formEl) {
        //Toda vez que vamos retornar um novo objeto temos que colocar  return new nomeClasse;
        return new Promise((resolve, reject) => {//Classe que trata as promessas. Caso ocorra tudo bem retorna o resolve, se não executa o rejected;

            let fileReader = new FileReader();//Inicializamos o objeto com a classe FileReader que manipula arquivos;
            //Esse objeto precisa ter um método para quando a foto terminar de ser carregada ( onload ) , um para retornar um possível erro ( onerror ) e um método para guardar a foto serializada em base64 ( readAsDataUrl );

            let elements = Array.from(formEl.elements).filter(item => {

                //filter é uma função nativa do js que filtra um array com base em determinada condição e retorna um novo array somente com os itens filtrados;
                if (item.name === 'photo') {

                    return item;

                }

            });

            let files = elements[0].files[0];//a função filter me retorna um novo array com os elementos filtrados pela condição. Nesse caso precisamos só do campo ( o array retornado vem com mais algumas informações que não são úteis no momento ) que está na posição 0 do array. Files é um sub array com mais informações da foto e só precisamos do 'nome.extensão' que está no índice 0; 

            fileReader.onload = () => {//função de callBack, após terminar a execução de alguma coisa execute essa função. Nesse caso quando terminarmos de carregar a imagem no onload a função será executada. Fazemos isso porque não sabemos quanto tempo vai demorar pra carregar a foto e só podemos continuar quando a mesma estiver pronta; 
                //Quando acabar de carregar a imagem precisamos do conteúdo do arquivo que vai vir serializado como uma url base64 que é interpretada normalmente pela tag img.
                resolve(fileReader.result);
                //Retorna a foto serializada 



            }

            fileReader.onerror = e => {//e recebe o erro do fileReader.onerror . Também é uma função de callBack;

                reject(e);//variável que retorna o erro que ocorreu durante a execução

            }

            if (files) {//Caso alguma foto tenha sido carregada ela é adicionada ao atributo photo do objeto User;

                fileReader.readAsDataURL(files);//Guarda a foto serializada;

            } else {//caso contrário colocaremos uma imagem padrão para o usuário;

                resolve('dist/img/default-user.png');//envia a foto padrão para ser colocada na tabela.
                //Não colocamos erro para caso o usuário não coloque uma imagem porque não é intenção tornar isso algo obrigatório;

            }


        });


    }//Fim getPhoto

    getValues(formEl) {//função que pega os valores digitados no formulário e os retorna em um objeto User;

        let user = {};//inicializamos o Json;

        let isValid = true;//Essa variável é a que vai determinar se devemos ou não adicionar o novo usuário na tabela de usuários;

        //Precisamos passar o this.formEl dentro da função Array.from() porque esse atributo não é um array e sim uma coleção de elementos HTMl. Sendo assim ele não possui a função forEach;
        //O forEach não funciona em cima de objeto HTMl, como a coleção retornada no querySelector do this.formEl;
        //Outra solução seria [...this.formEl.elements] => Operador Spread;
        Array.from(formEl.elements).forEach(field => {

            //Antes de enviar o formulário temos que verificar se os campos foram preenchidos
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {//Se o nome do campo estiver no array;

                let parent = field.parentElement; //Temos que procurar o elemento pai, a div que o contém;

                parent.classList.add('has-error');//Adicionamos a classe has-error que é a responsável por fazer o compo ficar vermelho ( Isso é um recurso do AdminLte );

                let span = document.createElement('span');//Criamos um span para mostrar uma mensagem logo abaixo do campo vazio para indicar ao usuário que ele deve ser preenchido;

                span.classList.add('help-block');//classe do AdminLte;

                span.textContent = 'Campo obrigatório';//Adicionamos o texto que vai ser exibido;

                parent.appendChild(span);//Adicionamos o span no form group para que ele seja exibido em baixo do input com erro;

                isValid = false;//Caso algum entre os obrigatórios apresente algum erro a variável de validação recebe false;

            }


            //se o nome do campo do formulário for gender ( os campos com esse nome são radio buttons)
            if (field.name == 'gender') {

                //se o campo estiver checado, ou seja, for o radio button escolhido pelo usuário, ele é adicionado no user;
                if (field.checked) user[field.name] = field.value;//user é o json inicializado lá em cima;
                //console.log("Sim",field.name);

            } else if (field.name == 'admin') {//Caso o campo seja o admin precisamos adicionar se ele está ativo ( o usuário criado é um administrador ) ou não ( usuário comum );

                if (field.value) user[field.name] = field.checked;//Mas não podememos colocar "Sim" ou "Não" por aqui, temos que alterar somente na view ( no método addLine );


            }
            else {//Caso não seja nenhuma das exceções acima o valor é atribuido normalmente ao Json;
                //atribuimos a relação nomeCampo = valor no Json;
                user[field.name] = field.value;
                // console.log("nops",field.name);
            }

        });

        if (!isValid) {//Se isValid for false, ou seja, algum campo obrigatório não tenha sido preenchido

            return false;//temos que sair da função para impedir que o novo usuário seja cadastrado sem que o formulário tenha sido preenchido corretamente;
            //return sai do if e como estamos dentro de um método ( funções só podem retornar um valor ) acaba saindo dele também;
        }


        //retornamos um User ( classe que está na pasta models ) para armazenar as informações recolhidas do formulário;
        //toda vez que vamos retornar um novo objeto temos que colocar return new nomeClasse;
        return new User(

            //inicializamos o objeto com os dados do Json user;
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin

        );

    }//Fim getValues

    addLine(userData) {//função que adiciona uma linha na tabela dos usuários;

        let tr = this.getTr(userData);

        //Pegamos a tag <tbody id='table-users'> ( Que representa o corpo da tabela no arquivo index.html ) na inicialização da variável tabeleEl. A cada execução dessa função é adicionada uma linha à tabela;
        this.tableEl.appendChild(tr);
        //adiciona um elemento como filho do elemeto que chamou a função;

        //Após adicionarmos uma linha na tabela ( um novo usuário ) temos que atualizar as estatísticas, a quantidade de usuários e de administradores que é mostrada na tela;
        this.updateCount();//Só podemos chamar o updateCount depois que todas as operações de alteração no tbody já ocorreram

    }//Fim addLine

    updateCount() {//Atualiza os contadores de usuários e administradores

        let numberUsers = 0;
        let numberAdmin = 0;


        //Array.from transforma uma coleção em array. Nesse caso uma coleção de elementos HTML, os itens do tbody  ( informações do usuário );
        Array.from(this.tableEl.children).forEach(tr => {
            //forEach em cada 'filho' da tabela, cada linha de usuário;
            numberUsers++;//Para cada linha presente no tbody da tabela de usuários ( para cada usuário ) adicionamos +1 ao número de usuários;

            let user = JSON.parse(tr.dataset.user);//Capturamos o dataSet serializado presente no tr e transformamos em JSON novamente

            //Como admin é uma propriedade do JSON temos que colocar _ para acessá-lo
            if (user._admin) numberAdmin++;
            //se for admin soma +1 ao número de administradores;


        });


        //Pegamos os elementos que exibem a quantidade de usuários e administradores e atualizamos o número que exibem;
        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }//Fim updateCount

    showUpdateForm() {//Mostra o formulário de edição

        document.querySelector("#box-user-create").style.display = 'none';
        document.querySelector("#box-user-update").style.display = 'block';

    }//Fim showUpdateForm

    showRegisterForm() {//Mostra o formulário de cadastro

        document.querySelector("#box-user-update").style.display = 'none';
        document.querySelector("#box-user-create").style.display = 'block';

    }//Fim showRegisterForm

    addEventsTr(tr) {

        //Evento quando clicamos no botão Editar
        Utils.addEventListenerAll(tr.querySelector(".btn-edit"), "click drag", f => {

            //Pegamos o dataset.user ( dataset da tr ) serializado e transformamos em JSON denovo
            let json = JSON.parse(tr.dataset.user);

            // console.log(json);

            //Criamos mais uma variável no dataset da tr e guardamos nela o indíce da linha na tabela, indice que vai ser usado mais tarde para saber de qual linha capturar os valores. Isso funciona como uma PK provisória;
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            //for in -> laço para percorrer objetos
            //para cada atributo do json
            for (let name in json) {

                //Procuramos o campo do formulário de edição com o mesmo nome do item do JSON
                //Colocamos replace("_"," ") porque os itens do JSON começam com _ ( tem o mesmo nome do campo do formulário só que com _. Tem o mesmo nome porque atribuimos o nome da chave e o valor no método getValues)
                let field = this.formUpdateEl.querySelector('[name=' + name.replace("_", "") + ']');

                //Nem todos os elementos do json possuem um campo no formulário, o register por exemplo só existe na classe User e consequentemente ( já que o JSON foi montado com o nome dos atributos do objeto e seus respectivos valores ) no JSON, não temos um campo register no formulário 
                if (field) {

                    //tipo do campo. Cada tipo vai receber um tratamento diferente
                    switch (field.type) {

                        //Se for do tipo file não precisa fazer nada, só ignora e passa pro próximo item
                        case 'file':
                            continue;
                            break;

                        //Se for radio ( gender m ou f) temos que selecionar o que  tem o nome igual o que está passando pelo for in ( nessa condição se encaixa os dois ) e que também seja do value que esteja passando pelo for in (M ou F); 
                        //Ao achar qual é ativamos;
                        case 'radio':
                            //Não podemos usar esse query selector fora do for in porque somente os campos de sexo têm value;
                            field = this.formUpdateEl.querySelector('[name=' + name.replace("_", "") + '][value=' + json[name] + ']');
                            field.checked = true;
                            break;

                        //Se for checkbox o checked do campo recebe o valor que está guardado no JSON, já que salvamos apenas true ou false;
                        case 'checkbox':
                            field.checked = json[name];
                            break;


                        //Adicionamos o valor da chave do atributo do objeto JSON no campo do formulário de edição
                        default:
                            field.value = json[name];
                            break;

                    }

                }

            }

            this.formUpdateEl.querySelector('.photo').src = json._photo;
            //Define a foto do <img> do campo de edição de foto comoa foto atual do usuário


            //Ocultamos o formulário de criação e exibimos o de edição
            this.showUpdateForm();

        });

        //Evento para excluir uma linha da tabela 
        //adicionamos o evento no botão de excluir de cada uma das linhas da tabela
        Utils.addEventListenerAll(tr.querySelector('.btn-delete'), 'click drag', f => {

            //confirm -> Aparece uma caixa de diálogo com Ok e cancelar, se clicarmos em ok devolve true, false se clicarmos em cancelar
            if (confirm("Deseja realmente excluir?")) {


                let user = new User();
                //temos que carregar os dados do usuário que está vindo na tr e exclui-los do storage.
                
                user.loadFromJSON(JSON.parse(tr.dataset.user));
                //colocamos todos os métodos de manipulação de dados no model 
                
                user.storageRemove(this.storageType);
                    
                //método que remove a linha da tabela
                tr.remove();

                //Atualizamos a quantidade de usuários
                this.updateCount();

            }

        })

    }//Fim addEventsTr

    getTr(userData,tr = null){//Coloca os dados passados em uma tr específica ou uma novo
        // Quando temos uma função com parâmetros não obrigatórios, esses devem vir por último.
        
    
            //Se não passarmos nenhuma tr pra função quer dizer que queremos adicionar uma nova linha à tabela
            if (tr === null) tr = document.createElement('tr');//criamos dinamicamente uma linha para a tabela a cada inserção, preenchendo os seus valores com os atributos do objeto User;
              //tr -> parâmetro do método

            //dataset é uma API que permite adicionarmos atributos dentro de elementos HTML;
            tr.dataset.user = JSON.stringify(userData);//recebemos o userData ( Json com os dados do usuário ) serializado ( Serializar é transformar um objeto em string);
            //elemento.dataset.nomevariavel;
            //Quando colocamos alguma coisa depois do elemento.dataset quer dizer que estamos criando uma variável que vai ter o nome do que foi colocado e que vai receber um valor. Podemos ter certeza que ela vai receber um valor, pois criar uma variável para não guardar nada é uma atitude desprovida de lucidez;
    
            //Como vamos manipular o conteúdo HTML do elemento precisamos usar o innerHTML, e como não é uma string, o texto tem que ser interpretado como HTML, temos que usar template String (string com crase);
            tr.innerHTML = `
            <td><img src="${userData.photo}" alt="User Img" class="img-circle img-sm"></td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${(userData.admin) ? "Sim" : "Não"}</td>
            <td>${Utils.dateFormat(userData.register)}</td>
            <td>
              <button type="button" class="btn-edit btn btn-primary btn-xs btn-flat">Editar</button>
              <button type="button" class="btn-delete btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
          </tr>`
                ;//alt='txt' é o texto que vai ser mostrado no lugar da imagem caso ocorra algum erro de carregamento;
    
            // <td>${(userData.admin)?"Sim":"Não"}</td> Operador ternário. Se o user.admin for true coloca sim no campo da tabela, não caso contrário;
    
            //querySelector -> ElementoOndeQueremosProcurar("classe/id"); 
    
            //Método que adiciona os valores a serem editados nos campos do formulário de edição
            this.addEventsTr(tr);
    
    
            return tr;
    
    }

    resetForm(form, btn) {

        form.reset();//método nativo de formulários que limpa todos os campos;

        btn.disabled = false;//Após adicionar/alterar o usuário e limpar o formulário podemos liberar o botão novamente;
    }//Fim resetForm


    //MÉTODOS DE ARMAZENAMENTO DE DADOS 

    listUsersStored() {//lista todos os usuarios armazenados no sessionStorage

        let users = User.getUsersStored(this._storageType);//método que carrega os usuários já existentes na sessão;

        Array.from(users).forEach(userData => {

            //Precisamos transformar o objeto em uma instância de User porque no método addLine usamos um objeto User para colocar os valores na tabela;
            let user = new User();

            //chamamos o método que transforma o JSON em User
            user.loadFromJSON(userData);

            //Após a conversão podemos passar o objeto para a função addLine normalmente
            this.addLine(user);

        });


    }//fim listUsersStored



}//Fim classe UserController