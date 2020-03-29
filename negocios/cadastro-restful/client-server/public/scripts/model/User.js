class User {

    constructor(name, email, gender, cpf) {

        this._name = name;
        this._email = email;
        this._gender = gender;
        this._cpf = cpf;
        this._id;

    }

    get name() {

        return this._name;

    }

    set name(value) {

        this._name = value;

    }

    get email() {

        return this._email;

    }

  
    set email(value) {

        this._email = value;

    }

    get gender() {

        return this._gender;

    }

    set gender(value) {

        this._gender = value;

    }

    get cpf() {

        return this._cpf;

    }

    set cpf(value) {

        this._cpf = value;

    }

    get id()
    
    {

        return this._id;

    }

    set id(value)
    {

        this._id = value;

    }

    loadFromJson(json) {

        for (let name in json) {

            this[name] = json[name];


        }

    }

    toJson() {


        let json = {}

        //Object.keys(objeto)->Lê todos os atributos do objeto passado e retorna um array
        Object.keys(this).forEach(key => {

            if (this[key] !== undefined) json[key] = this[key];

        });

        return json;

    }

    save() {

        return new Promise((resolve,reject)=>{

            let promise;

            if (this.id) { //se tem id é edição
    
                promise = Fetch.put(`/users/${this.id}`, this.toJson());
    
    
            } else {// se não tem estamos criando um usuário
                
                //dentro do client server usar a rota users, porque dentro do app.js ela é a rota padrão. Dentro das routes/users ele faz referencia a rota players do node-restful
                promise = Fetch.post(`/users`, this.toJson());
                console.log('cadastrando');
            }
    
    
            promise.then(data=>{
    
                this.loadFromJson(data);

                resolve(this);
    
            }).catch(e=>{

                reject(e);

            });
    
    

        });//fim Promise

    }


    static getUsersStored() {

        return Fetch.get('/users');

    }

    storageRemove() {

        return Fetch.delete(`/users/${this.id}`);


    }
}