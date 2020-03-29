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
               if(name.substr(0,1) === "_" ) this[name] = json[name];
                 //this[_nome] = json[_nome];
                //chama o set de nome adicionando o _nome do json;  
                break;

           }
            
        
        }
    }
    

    toJson(){
        
        let json = {};

        //retorna um array com as chaves do objeto passado
        Object.keys(this).forEach(key=>{

                if(this[key] !== undefined) json[key] = this[key];


        });

        return json;


    }
    
    save(){

        return new Promise((resolve,reject)=>{

            let promise;

            if (this.id){// se tem um id significa que vamos editar
    
               promise =  HttpRequest.put(`/users/${this.id}`,this.toJson());
    
    
            } else {// se não temos um id vamos cadastrar um novo usuário
    
               promise =  HttpRequest.post(`/users`,this.toJson());
    
            }
    
            promise.then(data=>{
    
                this.loadFromJSON(data);

                resolve(this);
    
    
            }).catch(e=>{

                reject(e);

            });

        });


      


    }//fim save

    static getUsersStored(storageType) {//Carrega todos os usuários já existentes na sessão

        return Fetch.get('/users');

    }//fim getUsersStored

    storageRemove(){

        return Fetch.delete(`/users/${this.id}`);


    }

   
}//Fim User