class DropBoxController {

    constructor() {

        //é uma convenção adicionarmos El no final do nome de um atributo que armazena um elemento HTML
        this._btnSendFileEl = document.querySelector('#btn-send-file');//#nome é um seletor css3
        this._inputFileEl = document.querySelector('#files');
        this._snackModalEl = document.querySelector('#react-snackbar-root');
        this._pbTimeleftEl = document.querySelector(".timeleft");

        this.btnNewFolderEl = document.querySelector("#btn-new-folder");
        this.btnRenameEl = document.querySelector("#btn-rename");
        this.btnDeleteEl = document.querySelector("#btn-delete");

        this._listFilesEl = document.querySelector("#list-of-files-and-directories");
       
        // Firebase instance
        this._firebase = new Firebase("files");

        //Files instance
        this.files = new Files(this.firebase);

        //Evento personalizado
        this.onSelectionChange = new Event("selectionChange");

        this.initEvents();

        this.files.openFolder("");

    }
    //.constructor

    //GETTERS AND SETTERS

    get btnSendFileEl() {
        return this._btnSendFileEl;
    }

    set btnSendFileEl(value) {
        this._btnSendFileEl = value;
    }

    get inputFileEl() {
        return this._inputFileEl;
    }

    set inputFileEl(value) {
        this._inputFileEl = value;
    }

    get snackModalEl() {
        return this._snackModalEl;
    }

    set snackModalEl(value) {
        this._snackModalEl = value;
    }

    set pbTimeleftEl(value) {
        this._pbTimeleftEl.innerHTML = value;
    }


    get listFilesEl() {
        return this._listFilesEl;
    }
    //.GETTERS AND SETTERS\\

    get screen() {
        return this._screen;
    }

    get firebase() {
        return this._firebase;
    }

    set firebase(value) {
        this._firebase = value;
    }

    //FIM GETTERS AND SETTERS

    initEvents() {

        this.btnNewFolderEl.addEventListener("click", () => {

            let name = prompt("Informe o nome da nova pasta");

            if (name) {

                this.firebase.newFolder(name);

            }

        });

        this.btnDeleteEl.addEventListener("click", () => {

            //remove da pasta
            this.files.removeFile().then(responses => {

                responses.forEach(response => {

                    if (response.fields.key) {

                        //remove do firebase
                        this.firebase.delete(this.firebase.currentFolder.join("/"), response.fields.key);

                    }

                });

            }).catch(e =>{

                console.error(e);

            });

        });

        this.listFilesEl.addEventListener('selectionChange', e => {

            switch (this.getSelection().length) {

                case 0:

                    Utils.hideButtons([[this.btnDeleteEl, true], [this.btnRenameEl, true]]);

                    break;

                case 1:

                    Utils.hideButtons([[this.btnDeleteEl, false], [this.btnRenameEl, false]]);

                    break;

                default:

                    Utils.hideButtons([[this.btnRenameEl, true], [this.btnDeleteEl, false]]);

                    break;

            }

        });

        Utils.addEventListenerAll(this.btnRenameEl, "click drag", () => {

            let li = this.getSelection()[0];

            let file = JSON.parse(li.dataset.file);

            let name = prompt("Digite o novo nome:", file.name);

            if (name) {

                file.name = name;

                this.firebase.edit(this.firebase.currentFolder.join("/"), file, li.dataset.key);

            }

        });

        //Adicionando Evento de clique ao botão Enviar Arquivos
        Utils.addEventListenerAll(this.btnSendFileEl, 'click drag', () => {
            //Utilizamos essa função porque o AddEventListener do JavaScript só permite adicionarmos um evento por vez em um elemento

            Utils.swapbutton(this.btnSendFileEl, true);

            this.inputFileEl.click();
            //fazendo isso estamos forçando a ação do clique em um input file ( abrir o explorador de arquivos ) através do clique no botão 'Enviar Arquivos'

        });

        //Após o usuário selecionar um arquivo vamos abrir uma barra de progresso para indicar o andamento do upload. Para isso temos que configurar o evento 'change' do input file ( Não está sendo usado diretamente, seu clique está respondendo ao clique em outro botão, mas ele está no HTML )
        Utils.addEventListenerAll(this.inputFileEl, 'change', (event) => {// configurando o evento de change do input files

            // o método uploadTask retorna uma lista de promises
            this.files.uploadTask(event.target.files).then(responses => {

                // salva cada uma das promises (cada promise contem um arquivo selecionado pelo usuário) no firebase
                responses.forEach(resp => {

                    resp.ref.getDownloadURL().then(data => {

                        this.firebase.save(this.firebase.currentFolder.join("/"), {

                            name: resp.name,
                            type: resp.contentType,
                            path: data,
                            size: resp.size

                        });
                    });

                });

                this.files.uploadComplete();

            }).catch(e => {

                this.files.uploadComplete();

                console.error(e);

            });

            this.files.modalShow();

        });
    }
    //.initEvents

    getSelection() {

        return this.listFilesEl.querySelectorAll(".selected");

    }
    //.getSelection

    initEventsLi(li) {

        li.addEventListener("dblclick", () => {

            let file = JSON.parse(li.dataset.file);

            switch (file.type) {

                case 'folder':

                    this.firebase.currentFolder.push(file.name);

                    this.files.openFolder(file.path);

                    break;

                default:

                    window.open(file.path);

                    break;

            }
            //.switch
            
        });

        li.addEventListener('click', (e) => {

            if (e.shiftKey) {

                let firstLi = this.listFilesEl.querySelector("li.selected");

                if (firstLi) {

                    let start;
                    let end;
                    let lis = li.parentElement.childNodes;

                    lis.forEach((el, index) => {

                        if (firstLi === el) start = index;

                        if (li === el) end = index;

                    });

                    let indexes = [start, end].sort();

                    lis.forEach((el2, index2) => {

                        if (index2 >= indexes[0] && index2 <= indexes[1]) el2.classList.add("selected");

                    });

                    this.listFilesEl.dispatchEvent(this.onSelectionChange);

                    return true;

                }

            }

            if (!e.ctrlKey) {

                //selecionar vários arquivos somente quando o ctrl estiver pressionado. Pegamos todos os elementos que estão selecionados e removemos a classe que coloca o efeito css
                this.listFilesEl.querySelectorAll('li.selected').forEach(el => {

                    el.classList.remove('selected');

                });

            }

            //adicionamos a decoração apenas no elemento selecionado
            li.classList.toggle('selected');

            this.listFilesEl.dispatchEvent(this.onSelectionChange);

        });

    }
    //.iniEventsLi
}
//.DropBoxController