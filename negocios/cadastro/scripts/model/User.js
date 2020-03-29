class User{

    constructor(name,email,gender,cpf){

        this._name = name;
        this._email = email;
        this._gender = gender;
        this._cpf = cpf;

    }

    get name(){

        return this._name;

    }

    set name(value){

        this._name = value;

    }

    get email(){

        return this._email;

    }

    set email(value){

        this._email = value;

    }

    get gender(){

        return this._gender;

    }

    set gender(value){

        this._gender = value;

    }

    get cpf(){

        return this._cpf;

    }

    set cpf(value){

        this._name = value;

    }

    loadFromJson(json){

        for(let name in json){

            this[name] = json[name];


        }

    }

    save(){
        
    }


    static getUsersStored(){
      
        
    }

    storageRemove(){

       


    }
}