class Cadastro{

    constructor(){

        this._formEl = document.querySelector('#register-form');
        this._formUpdateEl = document.querySelector('#edit-form');
        this._tableEl = document.querySelector('#table-body');
        this.onSubmit();
        this.onEdit();
        this.listUsersStored();


    }

    get formEl(){

        return this._formEl;
        

    }

    get tableEl(){

        return this._tableEl;

    }

    get formUpdateEl(){

        return this._formUpdateEl;

    }

    onSubmit(){

        Utils.addEventListenerAll(this.formEl,'submit',event=>{

            event.preventDefault();//Impedimos que a página seja recarregada

            let values = this.getValues(this.formEl);

            let btn = this.formEl.querySelector('button');

            btn.disabled  = true;



            if(values){
                
                values.save().then(user=>{

                    this.addLine(user);

                    this.resetForm(this.formEl,btn);

                });

               

            } 

        });


    }

    onEdit(){

        let btn = this.formUpdateEl.querySelector('.btn-cancel');

        Utils.addEventListenerAll(btn,'click drag',f=>{

            this.showCreateForm();

        });

        Utils.addEventListenerAll(this.formUpdateEl,'submit',func=>{

            func.preventDefault();

            let values = this.getValues(this.formUpdateEl);


            let btn = this.formUpdateEl.querySelector('.btn-save');

            btn.disabled = true;

            let index = this.formUpdateEl.dataset.trIndex;

           let tr = this.tableEl.rows[index];

           let userOld = JSON.parse(tr.dataset.user);

           let result = Object.assign({},userOld,values);

            let user = new User();

            user.loadFromJson(result);

            user.save().then(user=>{

                this.getTr(user,tr);

                this.resetForm(this._formUpdateEl,btn);
    
                this.showCreateForm();

            });

           

        });
        


    }

    getValues(formEl){

      

        let user = {};//onde serão armazenados os dados do usuário

        let isValid = true; // variável que indica se podemos ou não prosseguir

        //temos que fazer isso porque o formEl é uma coleção HTML, e forEach só funciona com arrays
        Array.from(formEl).forEach(field=>{

            

            //Se o campo tiver um desses nomes e não possuir valor ( nada inserido )
            if(['name','email','cpf'].indexOf(field.name)> -1 && !field.value){

                let parent = field.parentElement;

                //criamos um span para adicinar uma mensagem para indicar ao usuário que ele é obrigado a preencher o campo
                let span = document.createElement('span');

                span.style.fontSize = '13px';

                span.textContent = 'Preencha esse campo';

                span.style.color = 'red';

                parent.appendChild(span);


                isValid = false;

              
                                

            } 

            if(field.name === 'cpf'){

                if(isNaN( field.value)){

                    let parent = field.parentElement;

                    //criamos um span para adicinar uma mensagem para indicar ao usuário que ele é obrigado a preencher o campo
                    let span = document.createElement('span');
    
                    span.style.fontSize = '13px';
    
                    span.textContent = 'Somente numeros';
    
                    span.style.color = 'red';
    
                    parent.appendChild(span);
    
                    
                    isValid = false;
                                    

                }

           }
    
            
            if(field.name == 'gender'){

                if(field.checked) user[field.name] = field.id;

            } else {

                user[field.name] = field.value;

            }
           
        });


        if(!isValid){

            return false;
            
        }

        

        return new User(

            user.name,
            user.email,
            user.gender,
            user.cpf

        );




    }

    addLine(userData){

        let tr = this.getTr(userData);

        

        this.tableEl.appendChild(tr);

    }

    getTr(userData,tr = null){

    
        //se não for passada uma tr ( criando novo usuário ) criamos uma para colocar os dados
        if (tr === null) tr =  document.createElement('tr');


        //adicionamos uma variável que guarda os dados do usuário dentro da tr
        tr.dataset.user = JSON.stringify(userData);

       
        tr.innerHTML = `

                <tr>
                <td>${userData._name}</td>
                <td>${userData._email}</td>
                <td>${userData._gender}</td>
                <td>${userData._cpf}</td>
                <td>

                    <div class='action-container'>
                        <button class='btn-edit'>Editar</button>
                        <button class='btn-exclude'>Excluir</button>
                    </div>

                </td>
            </tr>
        
        
        
        `

        this.addEventsTr(tr);

        return tr;

    }

    addEventsTr(tr){

        Utils.addEventListenerAll(tr.querySelector('.btn-edit'),'click drag',func=>{

            let json = JSON.parse(tr.dataset.user);
    
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for(let name in json){

                let field = this.formUpdateEl.querySelector('[name='+name.replace("_"," ")+']');

                if(field){

                    switch(field.type){

                        case 'radio':
                            //field recebe o radio button que está selecionado
                            field = this.formUpdateEl.querySelector('[name='+name.replace("_"," ")+'][value='+json[name]+']');
                            field.checked = true;
                        break;


                        default:
                            field.value = json[name];
                        break;


                    }
                }
            }

            this.showUpdateForm();

        });

        Utils.addEventListenerAll(tr.querySelector('.btn-exclude'),'click drag',func=>{

            if(confirm('Deseja Excluir?')){

                let user = new User();

                user.loadFromJson(JSON.parse(tr.dataset.user));

                user.storageRemove().then(data=>{

                    tr.remove();

                });

            }

        });

    }

    resetForm(form, btn) {

        form.reset();//método nativo de formulários que limpa todos os campos;

        btn.disabled = false;//Após adicionar/alterar o usuário e limpar o formulário podemos liberar o botão novamente;
    
    }//Fim resetForm

    showUpdateForm(){

        document.querySelector('#register-section').style.display='none';
        document.querySelector('#edit-section').style.display='block';

    }

    showCreateForm(){

        document.querySelector('#edit-section').style.display='none';
        document.querySelector('#register-section').style.display='block';

    }

    listUsersStored(){


        User.getUsersStored().then(obj=>{

            obj.players.forEach(dataPlayer=>{

                let user  = new User();
    
                user.loadFromJson(dataPlayer);
    
                this.addLine(user);
    
    
              });

        });

       
    }

}