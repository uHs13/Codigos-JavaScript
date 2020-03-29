class User{

    constructor(name,gender,birth,country,email,password,photo,admin){

        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        this._id;

    }

    get name(){

        return this._name;

    }
   
    get gender(){

        return this._gender;

    }
    
    get birth(){

        return this._birth;

    }
    
    get country(){

        return this._country;

    }
    
    get email(){

        return this._email;

    }
    
    get password(){

        return this._password;

    }

    get photo(){

        return this._photo;

    }
    
    get admin(){

        return this._admin;

    }

    get register(){
        return this._register;
    }

    get id(){

        return this._id;

    }

    set name(value){

        this._name = value;
    }

    set gender(value){

        this._gender = value;
    }

    set birth(value){

        this._birth = value;
    }

    set country(value){

        this._country = value;
    }

    set email(value){

        this._email = value;
    }
    
    set password(value){

        this._password = value;
    }
    
    set photo(value){

        this._photo = value;
    }
    
    set admin(value){

        this._admin = value;
    }

    set id(value){

        this._id = value;

    }

    loadFromJSON(json){//instância um novo User a partir de um JSON

        //For in para percorrer objetos;
        for (let name in json){

            /*
              os valores do json têm _ antes. Como então a nossa classe vai saber em qual atributo adicionar o valor? Devemos lembrar que o JavaScript
              não possui o modo de visibilidade private implementado e que por conta disso existe a convenção que devemos adicionar _ antes do nome de
              um atributo privado. Portanto ao colocarmos this[name] (ex.: this[_nome]) estariamos falando do atributo nome da classe User, e como a 
              classe têm métodos de get e set, nesse caso ( caso do for in no json) ao fazermos referência aos atributos os métodos de set serão chamados 
              e os valores instânciados no objeto normalmente.
            */
           switch(name){

            case '_register':
                //Dentro do json a data está salva como string. Precisamos convertê-la em Date porque o atributo register dessa classe (User, classe que estamos) é do tipo date, sendo do tipo date só recebe valores de date
                this[name] = new Date(json[name]);
                break;

            default:
                this[name] = json[name];
                 //this[_nome] = json[_nome];
                //chama o set de nome adicionando o _nome do json;  
                break;

           }
            
        
        }
    }
    
    createId(storageType){//cria um id novo para um objeto caso seja a primeira vez que vamos salvá-lo no storage (local ou session)
       
        //precisamos guardar o valor do id em algum lugar onde qualquer objeto possa ter acesso.
        //esse local é o storage

        let usersID;

        switch(storageType){

            case 1:
            usersID = parseInt(sessionStorage.getItem('usersID'));
            break;

            case 2:
            usersID = parseInt(localStorage.getItem('usersID'));
            break;
        }

        if(!usersID > 0) usersID = 0 ;

        usersID++;

        switch(storageType){

            case 1:
                //sessionStorage é uma memória volátil, se fecharmos o navegador todos os dados serão perdidos
                //sessionStorage salva no formato chave:valor;
                //Temos que converter para string porque o sessionStorage salva somente strings. Se passassemos o JSON sem fazer o stringfy os métodos de armazenamento do localStorage fariam a conversão sozinhos e isso daria erro, o objeto não ficaria '{'name':'dmx'} ficaria 'Object[object]';
                // sessionStorage.setItem('users',JSON.stringify(users));
                sessionStorage.setItem('usersID', JSON.stringify(usersID));
                break;

            case 2:
                localStorage.setItem('usersID', JSON.stringify(usersID));
                break;

            default:
                console.error("Invalid Storage Option");
                break;

        }//fim switch

        return usersID;

    }//fim createId

    //data são os dados do objeto ( objeto todo )
    save(storageType){
        // console.log('User save:'+ storageType);
        //método estático da nossa classe
        let users = User.getUsersStored(storageType);//método que carrega os usuários já existentes na sessão;

        //Se já existir um id criado nesse objeto ( data ) precisamos localizá-lo dentro do array users( criado no inicio dessa função )
        if(this.id > 0){//EDITANDO USUÁRIO
            
           
           users.map(user=>{//user é cada item do array, cada usuário nele guardado
                
                //se o id do item que está sendo mapeado for o mesmo id do objeto data, ou seja,  se for o data dentro do storage
                if(user._id === this.id) {
                    
                    //pega todos os dados do user e substitui pelos antigos dados do objeto 
                    Object.assign(user,this);            

                }
                
                return user;
                

            });

        
        } else { //se não tem um id, precisamos gerá-lo. CRIANDO USUÁRIO
                      
                      //método estático da nossa classe

            this.id = this.createId(storageType);
            //setter do atributo id do nosso objeto

            
            //Adiciona o usuário da vez no array. users vira um array de JSONs, um array de objetos;
            users.push(this);

        }//fim else

        switch(storageType){

            case 1:
                //sessionStorage é uma memória volátil, se fecharmos o navegador todos os dados serão perdidos
                //sessionStorage salva no formato chave:valor;
                //Temos que converter para string porque o sessionStorage salva somente strings. Se passassemos o JSON sem fazer o stringfy os métodos de armazenamento do localStorage fariam a conversão sozinhos e isso daria erro, o objeto não ficaria '{'name':'dmx'} ficaria 'Object[object]';
                // sessionStorage.setItem('users',JSON.stringify(users));
                sessionStorage.setItem('users', JSON.stringify(users));
                break;

            case 2:
                localStorage.setItem('users', JSON.stringify(users));
                break;

            default:
                console.error("Invalid Storage Option");
                break;

        }//fim switch



    }//fim save

    static getUsersStored(storageType) {//Carrega todos os usuários já existentes na sessão

        //Array é uma variável indexada, guarda mais de uma informação;
        let users = new Array();// ou let users = []; 

        switch (storageType) {

            case 1:
                //Verifica se já existe algum usuário dentro da varável users da sessionStorage. Devolve uma string com os usuários, logo só precismos verificar se tem algo ou não, não perguntamos se o count > 0 porque é uma string;
                if (sessionStorage.getItem('users')) {

                    //Se tiver alguma coisa na string de usuários da sessionStorage devemos inicializar o nosso array com os usuários já existentes;
                    users = JSON.parse(sessionStorage.getItem('users'));
                    //transformamos novamente para JSON porque esse é o formato que estamos usando para cadastrar os usuários;
                }
                break;

            case 2:
                //Verifica se já existe algum usuário dentro da varável users da sessionStorage. Devolve uma string com os usuários, logo só precismos verificar se tem algo ou não, não perguntamos se o count > 0 porque é uma string;
                if (localStorage.getItem('users')) {

                    //Se tiver alguma coisa na string de usuários da sessionStorage devemos inicializar o nosso array com os usuários já existentes;
                    users = JSON.parse(localStorage.getItem('users'));
                    //transformamos novamente para JSON porque esse é o formato que estamos usando para cadastrar os usuários;
                }
                break;

            default:
                console.error('Invalid Storage Option');
                break;

        }

        return users;

    }//fim getUsersStored

    storageRemove(storageType){

        let users = User.getUsersStored(storageType);

        users.forEach((userData,index)=>{

            if(this.id == userData._id){

                //splice serve para remover um item específico de um array.
                //array.splice(aPartirdeOnde,quantosItens)
                //remove somente o usuário que está chamando o método;
                
                users.splice(index,1);

            }

        });
       
        switch(storageType){

            case 1:
                //sessionStorage é uma memória volátil, se fecharmos o navegador todos os dados serão perdidos
                //sessionStorage salva no formato chave:valor;
                //Temos que converter para string porque o sessionStorage salva somente strings. Se passassemos o JSON sem fazer o stringfy os métodos de armazenamento do localStorage fariam a conversão sozinhos e isso daria erro, o objeto não ficaria '{'name':'dmx'} ficaria 'Object[object]';
                // sessionStorage.setItem('users',JSON.stringify(users));
                sessionStorage.setItem('users', JSON.stringify(users));
                break;

            case 2:
                localStorage.setItem('users', JSON.stringify(users));
                break;

            default:
                console.error("Invalid Storage Option");
                break;

        }//fim switch


    }

   




}