class CalcController {

    constructor() {//método construtor
        this._audioOnOff = false;//atributo que vai deteminar se o áudio está ligado ou não;
        this._clickAudio = new Audio('res/click.mp3');//Audio é uma classe da Web API (Application Programming Interface);
        this._lastOperator = '';//guarda o ultimo operador utilizado
        this._lastNumber = '';// guarda o número que está no display;
        this._operation = [];// array que vai armazenar as entradas do display da calculadora;
        this._locale = 'pt-BR';//Local em string para ser utilizado em funções;
        this._displayCalcEl = document.querySelector("#display");//atributos com o _ na frente são, por convenção, privados. Não devem ser acessados diretamente, assim como em linguagens que já têm os tipos de visibilidade implementados;
        this._timeEl = document.querySelector("#hora");
        this._dateEl = document.querySelector("#data");
        this._currentDate;
        this.initialize();
    }


    initialize() {
        //set interval executa a arrow function a cada 1000 milissegundos;
        /*let interval = */
        this.setDisplayDateTime();//chamando esse método para que quando entrarmos na página já mostre a hora e a data. Sem isso fica com um delay de 1s, o setInterval só executa depois de 1s;

        setInterval(() => {//Arrow function => função mais simples;
            this.setDisplayDateTime();
        }, 1000);
        // usar o setInterval toda vez que quisermos executar algo várias vezes de maneira automática;

        /*setTimeout(()=>{//Exemplo de setTimeout();  para funcionar coloque let interval na frente do setInterval();
            
            clearInterval(interval);// depois de 3s ele para a hora da calculadora;

        }, 3000)*/

        this.initButtonsEvents();//Evento que inicializa os eventos de clique nos botões da calculadora;
        this.initKeyboard();//Evento que inicializa os eventos de teclado;
        this.pasteFromClipboard();

        //Não podemos colocar esse método dentro do initButtonsEvents porque o evento de duplo clique seria adicionado em todos os botões e só queremos no botão AC;
        document.querySelectorAll('.btn-ac').forEach(btn=>{//Vai selecionar os botões que tem a classe .btn-ac. Como o svg é feito em duas camadas (a do desenho do botão e a do número) serão retornados dois elementos. o foreach é pra adicionar nos dois;
            //dblclick é o evento quando clicamos duas vezes sobre um mesmo botão;
            btn.addEventListener('dblclick',e=>{
                //console.log((this._audioOnOff)?'audio desligado':'audio ligado');//mostra o que aconteceu com o áudio depois do duplo clique no AC;
                this.toggleAudio();

            });
        
        });
    }

    toggleAudio(){//this._audioOnOff é uma variável boolena. Essa função inverte o valor dela, se true->false e vice-versa;

        this._audioOnOff = !this._audioOnOff;

    }

    playAudio(){//Método que inicia o som das teclas.
        
        this._clickAudio.currentTime = 0;//reinicia o som do clique para que toda vez que um botão for pressionado, independente da velocidade entre os cliques, o som reinicie;

        //Se o audioOnOff for true (audio ligado) toca o som;
        if (this._audioOnOff) this._clickAudio.play();

    }


    setDisplayDateTime() {//determina nos dois displays. Sempre que for reutilizar códigos crie um método.

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",/* Formata a saida da data: xx de xx de xx */
            year: "numeric"
        });//determina o que vai aparecer no display da data;
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);//determina o que vai aparecer no display da hora;

    }

    //pega o que tá no display
    get displayTime() {
        return this._timeEl.innerHTML;
    }

    //Muda o conteudo do display
    set displayTime(time) {
        this._timeEl.innerHTML = time;
    }

    //pega o que tá no display
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    //Muda o conteudo do display
    set displayDate(date) {
        this._dateEl.innerHTML = date;
    }

    //pega o que tá no display
    get displayCalc() {
        return this._displayCalcEl.innerHTML;//retorna o que está escrito na tela no display de valores da calculadora
    }

    //Muda o conteudo do display
    set displayCalc(valor) {
      /*  //tem que fazer o toString pra não dar erros. Se for colocado um resultado de uma conta na tela e ele tiver mais de 10 digitos não entra no if e mostra fora do display. O toString resolve o problema o resultado entra no if;
        if(valor.toString().length > 10){//Como o display da calculadora tem um limite de caracteres precisamos tratar o limite de entrada de números;
            this.setError();//Se passar de 10 (limite  máximo com visualização total dos números) ele lança uma mensagem de erro na tela;
            return false;//return false pra poder sair do método e não executar as linhas subsequentes;
        }*/
        //if ternário;
        return ((valor.toString().length > 10))?this.setError():this._displayCalcEl.innerHTML = valor;

        
    }

    get currentDate() {
        return new Date();//retorna uma instancia da classe Date();
    }

    set currentDate(date) {
        this._dateEl.innerHTML = date;
    }

    get currentTime() {
        return this._timeEl.innerHTML;
    }

    set currentTime(time) {
        this._timeEl.innerHTML = time;
    }


    resetArray(array) {//Zera um array;
        for (let i = array.length; i >= 0; i--) {
            array.pop();
        }
    }

    clearAll() {
        this.resetArray(this._operation);//o botão AC(All Clear) da calculadora limpa todo o display, portanto devemos esvaziar o array que armazena as entradas
        //Vai ver que o array display tá zerado e vai passar pra função. Nela temos uma condição pra caso o array display esteja vazio seja colocado um zero no display;
        this.setLastNumbertoDisplay(this._operation);
    }

    clearEntry() {
        this._operation.pop();//o botão CE(Cancel Entry) da calculadora limpa o último número que digitamos, logo devemos remover a ultima entrada no array do display;
        this.setLastNumbertoDisplay(this._operation);
    }

    setError() {
        this.displayCalc = "Error";
    }

    //retorna o ultimo indice do array que tem os itens do display da tela
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);//retorna -1 caso o item não esteja no array. Se estiver retorna o número do index onde está.
        //vai retornar true caso o elemento esteja dentro do array e false caso contrário;
    }

    setLastOperation(value) {//troca o conteúdo da ultima posição do array do display da tela pelo valor informado;
        this._operation[this._operation.length - 1] = value;
    }

    isEmpty(array) {//verifica se o array está vazio, se sim retorna true, se não retorna false;
        return (array.length == 0);
    }

    getResult() {
        try{

            return eval(this._operation.join(""));//Usa o eval para fazer a conta com as três posições do array display;
        }catch(e){
            this.setError();
        }
        
    }

    //método chamado  toda vez que apertamos igual ou quando já temos mais de três itens no array display da calculadora;
    calc() {

        let last = '';

        //pega o último operador. Não precisa passar nada pq já tem o true como parâmetro padrão;

        this._lastOperator = this.getLastItem(true);
        //if elseif else -> cai em somente uma das condições. Se usarmos dois ifs seguidos pode ser que caia nos dois e não apresente o comportamento esperado;
        if (this._operation.length < 3) {//se tiver só dois elementos no array display.Ocorre quando clicamos (2+3=), fica só 5. Se apertarmos igual denovo tem que continuar somando 3

            let firstItem = this._operation[0];//captura o primeiro item do array, no caso o resultado da soma anterior
            this._operation = [firstItem, this._lastOperator, this._lastNumber];//repete a operação realizada só que com o resultado atual, adiciona +3 no 5 no exemplo dado acima ^^^^;

        }


        if (this._operation.length > 3) { //se tivermos mais de 3 elementos no array do display, ou seja, numero operador numero;

            last = this._operation.pop();//pega o ultimo elemento do array e tira para não atrapalhar o cálculo; 

            this._lastNumber = this.getResult();//lastNumber recebe o valor do cálculo realizado com os 3 elementos do array do display;

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }



        let result = this.getResult();//recebe o resultado do cálculo do join dos elementos restantes do array;

        if (last == '%') {//se o ultimo operador for o porcento ele divide por cem (por cem to);

            result /= 100;
            this._operation = [result];// atualiza o array só com o resultado porque o operador % não vai ser mais usado pra nada;

        } else {//se não for % a ultima operação; 

            this._operation = [result];//recria o array do display para mostrar só o resultado da última conta realizada
            if (last) this._operation.push(last);//se o last não estiver vazio ele é colocado no array;
        }

        this.setLastNumbertoDisplay(this._operation);//mostra o resultado da conta realizada no display da calculadora;
    }

    pushOperation(value) {
        this._operation.push(value);//coloca o valor passado no array do display

        if (this._operation.length > 3) {//Se tivermos mais de 3 elementos no array já é possível realizar uma conta (eval(numero operador numero) X)

            this.calc();//método que calcula o resultado das operações;

        }

    }

    getLastItem(isOperator = true) {// método para verificar se o último elemento do array do display é ou não um operador; 

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {//percorre o array de trás pra frente para poder pegar o último número ou operador digitado, de acordo com o booleano passado
            //se passarmos true o for vai procurar pelo último operador digitado, false pega o último número digitado
            if (this.isOperator(this._operation[i]) == isOperator) {// compara o elemento do array que está sendo analisado com a condição passada para a função. se true retorna o ultimo operador digitado. Se false retorna se o ultimo número digitado; 
                lastItem = this._operation[i];//lastItem recebe o último número ou operador;
                break;//break pq já achou e não precisa de mais nada
            }

        }

        if (!lastItem) {
            //if ternário
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
            //seo for um  operador o last recebe o lastOperator, se não recebe o lastNumber;
        }




        return lastItem;//retorna o item encontrado;


    }

    setLastNumbertoDisplay() {
        //quando dgitamos qualquer numero ele já é adicionado no array que vai pro display;
        let lastNumber = this.getLastItem(false);//como foi passado false no argumento a função vai retornar o ultimo número do array display;
        //por padrão o parâmetro do método getLastItem é true, retorna o último operador usado;
        /*if(lastNumber == null){
            lastNumber = 0;
        } Isso é igual a: */

        if (!lastNumber) lastNumber = 0;// Se não tiver nada no last number, ou seja, no quando abrimos a calculadora, f5 na pagina e quando clicamos em AC;
        
        if (this.isEmpty(this._operation)) lastNumber = 0;// Caso o array esteja vazio, clicou em AC por exemplo, adicionamos um zero no display;

        this.displayCalc = lastNumber;



    }


    addOperation(op) {//responsável por adicionar as operações referentes aos cliques na tela da calculadora;
        //isNaN retorna true se não for número e false se for número. isNaN == is not a number;
        //Antes de adicionar a operação (numero ou operador) no array do display temos que verificar se é um número ou não. Para cada caso teremos um tratamento.
        //console.log('A', isNaN(this.getLastOperation()));
        if (isNaN(this.getLastOperation())) {//Se o ultimo elemento do array display não for número == String.
            
            if (this.isOperator(op)) { //Se o ultimo item do array for um operador temos que trocá-lo pelo novo operador digitado;
                //Se sim temos que trocá-lo
                if (this.isEmpty(this._operation)) {//se o array estiver vazio e tentarmos inserir um operador vai dar certo, mas ao mesmo tempo errado porque o array vai ficar [-1:"op"]. Deu um erro de index;
                    this._operation.push(0);//se estiver vazio temos que inserir um zero antes para não dar erro e ficar [0, "op"] ao invés de [-1:'op'];
                    this._operation.push(op);//depois de colocar o zero é só inserir o operador normal; Se chamarmos a função de maneira recursiva com o operador vai mostrar o array 2x no console;
                } else {
                    this.setLastOperation(op);
                }
            } else {//se passar pelo if e pelo else if é um número e vai ser colocado no array
                this.pushOperation(op);
                this.setLastNumbertoDisplay();// Mostra o número digitado na tela da calculadora;
            }

        } else {//Se  o ultimo elemento do array display for número. Mesmo se passarmos um numero entre string ('13') o isNaN faz o parseInt e fala que é número, ou seja, retorna false;
            if (this.isOperator(op)) {// Se o ultimo elemento for um número e o a operação da vez for um operador temos que inseri-lo em outra posição do array do display;
                this.pushOperation(op);//Usa o push pra colocar em outra posição e não concatenar a operação;
            } else {//se a ultima posição do array for um número também temos concatená-lo à mesma posição do array;
                let newValue = this.getLastOperation().toString() + op.toString();//usa o to string para poder concatenar os dois numeros digitados antes de entrar com um operador. Como o operador de concatenação é um '+', se deixassemos como número iria fazer a soma dos dois e nos queremos que junte os dois (2 2 == 22 ! 4).
                this.setLastOperation(newValue);//adicionamos o novo número (número antigo concatenado à operação da vez) na ultima posição do array display, só que como inteiro para podermos fazer futuras operações matemáticas;
                this.setLastNumbertoDisplay();//mostra o valor na tela da calculadora;
            }
        }

    }

    addDot() {

        let lastOperation = this.getLastOperation();//método que retorna o último elemento do array do display;

        //verifica se estamos com uma string. Se for um número não dá pra fazer o split e pode dar um erro por ter passado da primeira verificação
        //Isso é pra impedir que possa ser colocado mais de um ponto em um número;
        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;


        if (this.isOperator(lastOperation) || !lastOperation /*verifica se a variável está como undefined */) {
            //se a ultima posição do array display for um operador ou se for vazia temos que colocar um 0. no display;
            this.pushOperation('0.');

        } else {

            this.setLastOperation(lastOperation.toString() + '.');//Se for um número a última posição significa que queremos entrar com um número decimal, logo temos que adicionar um ponto depois do número;

        }

        this.setLastNumbertoDisplay();//mostra o número na tela;

    }

    execBtn(btn) {

        this.playAudio(); //Se o áudio estiver ligado ele toca o som pra todos os cliques nos botões;
        
        switch (btn) {

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(btn));
                break;

            default:
                this.setError();//Caso o usuário entre com algum valor fora dos padrões manda uma msg de erro pra tela;
                break;

        }


    }

    initKeyboard() {//captura e trata os eventos do teclado;
        //keyup é o evento quando a tecla foi solta logo após ser pressionada;
        document.addEventListener('keyup', e => {
            
            this.playAudio(); //Se o áudio estiver ligado ele toca o som pra todos os eventos de teclado;
            
            //Não dá pra fazer um método pro switch dos cliques e do teclado porque eles (switches) não são iguais;
            switch (e.key) {//e é a arraow function(poderia ser qualquer nome) que vai devolver qual tecla eu apertei. O 'e.key' é pra pegar só o valor da tecla pressionada;

                case 'Escape'://esc
                    this.clearAll();
                    break;

                case 'Backspace':
                    this.clearEntry();
                    break;

                case '%':
                case '/':
                case '*':
                case '-':
                case '+':
                    this.addOperation(e.key);
                    break;

                case 'Enter':
                case '=':
                    this.calc();
                    break;

                case '.':
                case ',':
                    this.addDot();
                    break;

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();//caso tenha sido pressionado ctrl + c pra copiar o conteúdo do display da calculadora
                    break;


            }

        });


    }

    //Função que adiciona vários eventos a um elemento;
    addEventListenerAll(element, events, func) {//elemento em que vai ser aplicado, string com os nome dos eventos, função a ser aplicada;

        events.split(' ').forEach(event => {//para cada evento da string eventos

            element.addEventListener(event, func, false);//a calculadora é desenhada com duas camadas, logo o false aborta a função assim que o clique de uma camada responder;
            //aplica no elemento passado o evento da vez no split e a função que determina o que tem que acontecer quando esse evento for capturado; 
        })


    }

    pasteFromClipboard() {//pega o conteúdo da área de transferência e coloca no display da calculadora;
        //paste é o evento que representa quando algo é colado no document;
        document.addEventListener('paste', e => {
           //e.clipboardData.getdata pega o conteúdo da área de transferência;
            let text = e.clipboardData.getData('Text');//Text é o tipo de informação (Formato de dado) que eu quero trazer da área de tranferência, somente texto;
            
            if (!isNaN(text)) this.displayCalc = parseFloat(text);//Se o conteúdo colado pelo usuário for um número vai ser mostrado na calculadora, se não o conteúdo é ignorado.
            
            
        });

    }

    copyToClipboard() {//método que vai copiar o conteúdo do display da calculadora e mandar pra área de transferência;

        let input = document.createElement('input');//cria elementos dinamicamente na tela; Temos que fazer isso porque a calculadora é em SVG e esse formato não suporta os eventos de copiar pra área de transferência do SO;

        input.value = this.displayCalc;//determina o valor do elemento input;

        document.body.appendChild(input);//Coloca o input dentro do body como um subelemento; Temos que colocar como subelemento para ele permitir que seja feita a cópia do seu valor para a área de transferência do SO;

        input.select();//seleciona o conteúdo do input;

        document.execCommand('Copy');//Copia tudo o que está seleciona, no caso o conteúdo do nosso input;

        input.remove();//Temos que remover para o input não ficar aparecendo na tela do usuário;

        
    }


    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");//seleciona todos os elementos com a tag <g> dentro dos elementos com os ids #buttons e #parts; 

        buttons.forEach((btn, index) => {//foreach para percorrer todos os botões encontrados no querySelectorAll

            this.addEventListenerAll(btn, 'click drag', e => {//para cada botao executa a funcao da classe

                let textBtn = btn.className.baseVal.replace("btn-", "");//captura o retorno do botão clicado;

                this.execBtn(textBtn);

            });

            //eventos de mouse
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';//se passar pelo botao troca o símbolo do cursor;
            })

        })

    }




}