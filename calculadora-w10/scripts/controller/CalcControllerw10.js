class CalcControllerw10 {

    constructor() {//Devemos chamar os métodos responsáveis pela inicialização da calculadora dentro do construtor;
        this._audioOnOff = false;//Variável que permite ou não a propagação do som dos cliques;
        this._clickAudio = new Audio('res/click.mp3');//Associamos a variável ao local do arquivo;
        this._displayCalcEl = document.querySelector('#display');//vinculo a variável a div com a tag display dentro do index.html;
        this._operation = [];//array que vai armazenar tudo o que está sendo calculado;
        this._lastNumber = '';
        this._lastOperator = '';
        this.initialize();
        //console.log(this. displayCalc);
    }

    initialize() {

        this.initButtonsEvents();
        this.initKeyboard();
        this.pasteFromClipboard();


    }

    toggleAudio() {

        this._audioOnOff = !this._audioOnOff;

    }

    playAudio() {

        this._clickAudio.currentTime = 0;
        if (this._audioOnOff) this._clickAudio.play();
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        return ((value.toString().length > 10)) ? this.setError() : this._displayCalcEl.innerHTML = value;
    }

    resetArray(array) {
        for (let i = array.length; i >= 0; i--) {
            array.pop();
        }
    }

    //limpa todo o array que guarda o que está sendo feito na calculadora;
    clearAll() {
        this.resetArray(this._operation);
        this.setLastNumbertoDisplay(this._operation);
    }

    //apaga a ultima entrada do array com as operações;
    clearEntry() {
        this._operation.pop();
        this.setLastNumbertoDisplay(this._operation);
    }


    setError() {
        this.displayCalc = "Error";
    }

    //retorna a ultima posição do array que armazena as operações;
    getLastOperation() {
        //console.log(this._operation[this._operation.length - 1]);
        return this._operation[this._operation.length - 1];

    }

    isOperator(value) {//indexOf retorna a posição do array em que está o item passado, caso esse exista no array. Se não existir retorna -1;
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    setLastOperation(value) {//adiciona o valor na última posição do array com as operações;
        this._operation[this._operation.length - 1] = value;
    }

    isEmpty(array) {
        return (array.length == 0);
    }

    getResult() {//Retorna o resultado dos elementos do array. Dentro do array eles estão como string, usando o eval conseguimos um resultado. Ex.: eval ("2+2") == 4;
        try {
            if(this.getLastOperation() < 0) this.setLastOperation("("+this.getLastOperation()+")");//Caso o último número digitado seja negativo temos que adicionar parenteses para não dar erros em cálculos do tipo (50 - -50 == undefined) => (50 - (-50) == 100);
            return eval(this._operation.join("")).toString().length > 10 ? eval(this._operation.join("")).toFixed(4) : eval(this._operation.join(""));//Temos que formatar a saida, se der um resultado com mais de 10 casas vai ser chamado o getError();
        } catch (e){//.toFixed(nmr) detemina o número de casas decimais que um número real pode ter após a vírgula;
            this.setError();
        }
    }

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
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }
    }

    getLastItem(isOperator = true) {//método para capturar a última ocorrencia de um operador ou número no array;
        //Se passarmos true queremos retornar o último operador adicionado no array, false queremos retornar o último número; 
        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;

    }

    setLastNumbertoDisplay() {

        //pegamos o último número do array;
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        if (this.isEmpty(this._operation)) lastNumber = 0;

        this.displayCalc = lastNumber;

    }

    addOperation(op) {
        //isNaN retorna true se não for número e false se for número. isNaN == is not a number;
        //esse if pergunta se a ultima casa do array das operações não é um número
        if (isNaN(this.getLastOperation())) {//Antes de adicionar a operação (número ou operador) no array do display temos que verificar se é um número ou não. Para cada caso teremos um tratamento.
            if (this.isOperator(op)) {//Se não for um número, é um operador??
                if (this.isEmpty(this._operation)) {//se for operador, o array das operações está vazio? Se estiver temos que colocar um zero antes, não dá pra usar eval em algo assim ( + 2 - 2), vai dar erro. Colocando o zero (0+2-2) resolve normalmente;
                    this._operation.push(0);
                    this._operation.push(op);
                } else {//se não estiver vazio podemos adicionar o operador sem problemas;
                    this.setLastOperation(op);
                }
            } else {//se não for uma string nem um operador, é um número;
                this.pushOperation(op);//O número é adicionado no array;
                this.setLastNumbertoDisplay();//Com o número novo adicionado atualizamos o display;
            }

        } else {//Se for um número na última posição do array:
            if (this.isOperator(op)) {
                this.pushOperation(op);
            } else {//se não for um operador na última posição:
                let newValue = this.getLastOperation().toString() + op.toString();//Se for um número na última posição do array temos que concatena-lo ao último valor digitado;
                //console.log('numero '+ newValue);
                this.setLastOperation(newValue);
                this.setLastNumbertoDisplay();
            }

        }


    }

    addDot() {
        let lastOperation = this.getLastOperation();//pegamos o último item do array para verificações;
        //se a última posição do array for uma string(operador) e já tivermos um ponto no número que está sendo colocado não podemos permitir;
        if (typeof lastOperation === 'string' && lastOperation.split(' ').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation /*verifica se a variável está como undefined */) {
            this.pushOperation('0.');//se a última coisa do array for um operador ou a última operação não existir (array vazio) temos que colocar um zero antes de permitir o uso do ponto;
        } else {//se não for um operador ou a lastOperation não esteja vazia;
            //se não for nada do primeiro if é só transformar o a última posição do array em string e concatená-la a um ponto;
            this.setLastOperation(lastOperation.toString() + '.')

        }

        this.setLastNumbertoDisplay();//mostra o número na tela;
    }

    removeLastChar(str2) {//remove o último caracter de uma string
        let str1 = str2.toString().substr(0, (str2.length - 1));//substr devolve uma substring com o tamanho determinado pelo valores dos parâmetros. O primeiro é onde começa a substring e o segundo é onde deve terminar. Colocando str2.length-1 queremos retirar só a última posição dela; 
        this.setLastOperation(str1);//sobreescreve a última  posição do array com a string sem a última posição;
        this.setLastNumbertoDisplay();//reescreve o número no display;
    }

    backspace() {//Função para remover o último caracter de um número digitado na calculadora;

        if (isNaN(this.getLastOperation())) {//Se a última posição do array _operation não for um  número
            if (this.isOperator(this.getLastOperation())) {//temos que verificar se é um operador; 
                this._operation.pop();//se for temos que remove-lo para o usuário apagar o número que ele digitou;
                this.removeLastChar(this.getLastOperation());//removemos o ultimo caracter normalmente;

            }else{//se não for uma string nem um operador é um número mesmo, entrou no if errado;
                this.removeLastChar(this.getLastOperation());    
            }
        } else {//se não for uma string a última posição é um número, logo podemos apagar seu último caracter sem problemas;
            this.removeLastChar(this.getLastOperation());
        }
    }

    invertNumberValue(){
        

        if(!this.getLastOperation()) return;//Se a última posição do _operation for vazia não podemos fazer nada;

        if(!isNaN(this.getLastOperation()) && !this.isOperator(this.getLastOperation())){//Só podemos inverter o valor de números, logo se a última posição do array for um número podemos realizar a operação dde inversão de valor;
            this.setLastOperation(this.getLastOperation() * -1);
        }else{
            return;
        }

        this.setLastOperation(this.getLastOperation());//temos que colocar entre parenteses para não dar erros em operações do tipo 50 - (-50). Se colocar sem parenteses (50 - -50) a posição que era pra ficar o resultado fica como undefined;
        this.setLastNumbertoDisplay();
    }

    getsqrt(){
        
        if(!isNaN(this.getLastOperation()) && this.getLastOperation() > 0 ){//Não tem como tirar raiz quadrada de número negativo (não que eu saiba, pode até existir...);
            let valor = Math.sqrt(this.getLastOperation()).toString().length < 10 ? Math.sqrt(this.getLastOperation()) : Math.sqrt(this.getLastOperation()).toFixed(4); 
            this.setLastOperation(valor);
            this.setLastNumbertoDisplay();
        } else{
            return;
        }
    }

    getPow(){
        
        if(!isNaN(this.getLastOperation())){
            this.setLastOperation(Math.pow(this.getLastOperation(),2));
        }else{
            return;
        }

        this.setLastNumbertoDisplay();
    }

    getOneOverhead(){

        if(!isNaN(this.getLastOperation())){
            this.setLastOperation(1/this.getLastOperation());
        }else{
            return;
        }

        this.setLastNumbertoDisplay();
    }

    
    execBtn(btn) {
        this.playAudio();
        switch (btn) {

            case 'C':
                this.clearAll();
                break;

            case 'CE':
                this.clearEntry();
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
                //console.log(parseInt(btn));
                break;

            case 'X':
                this.addOperation('*');
                break;

            case '÷':
                this.addOperation('/');
                break;

            case '+':
            case '-':
            case '%':
                this.addOperation(btn);
                break;

            ///////////////////////////////////////////
            case '±':
                this.invertNumberValue();
                break;

            case '√':
                this.getsqrt();
                break;

            case 'x²':
                this.getPow();
                break;

            case '¹/x':
                this.getOneOverhead();
                break;



            case '←':
                this.backspace();
                break;

            case ',':
                this.addDot();
                break;

            case '=':
                this.calc();
                break;

            default:
                this.setError();
                break;

        }

    }

    initKeyboard(){

        document.addEventListener ('keyup', e=>{
            this.playAudio();
            //console.log(e.key);
            switch (e.key) {

                case 'Escape':
                    this.clearAll();
                    break;
    
                case 'Tab':
                    this.clearEntry();
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
                    //console.log(parseInt(btn));
                    break;
    
                case '*':
                case '/':
                case '+':
                case '-':
                case '%':
                    this.addOperation(e.key);
                    break;
    
                ///////////////////////////////////////////
    
                
    
    
                case 'Backspace':
                    this.backspace();
                    break;
    
                case ',':
                case '.':
                    this.addDot();
                    break;
    
                case '=':
                case 'Enter':
                    this.calc();
                    break;
                
            }

        });

    }

    pasteFromClipboard(){//método que nos permite colar valores externos no display da calculadora;
        document.addEventListener('paste', e=>{
            let text = e.clipboardData.getData('Text');
            if(!isNaN(text)) this.displayCalc = parseFloat(text);
        });
    }

    addEventListenerAll(element, events, func) {

        events.split(" ").forEach(event => {
            element.addEventListener(event, func, false);
        });

    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("div > button");//queryselectorAll vai juntar todos os elementos das condições que você passar(.class #id tag) em um array e retorná-lo;
        //para pegar todos os botões da nossa calculadora foi necessário procurar todos as tags button que eram subelementos das tags div;
        // console.log(buttons);

        //para cada elemento do meu array buttons execute essa arrow function
        buttons.forEach((btn, index) => {
            //em cada um dos botões vai ser chamada a função addEventListenerAll para adicionar os comportamentos em cada um dos eventos desejados;
            if (btn.textContent == 'C') {
                this.addEventListenerAll(btn, 'dblclick', e => {
                    this.toggleAudio();
                })
            }
            this.addEventListenerAll(btn, 'click drag', func => {
                let textBtn = btn.textContent;//button.textContent é a maneira que temos de pegar o texto do botão html <button>texto</button>;
                //console.log(textBtn);
                this.execBtn(textBtn);//chama a função que vai determinar o que acontece quando clicamos em cada botão;
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', func => {
                btn.style.cursor = 'pointer';//muda o estilo do cursor quando passa sobre o botão para poder indicar que podemos clicar;
            });

        });



    }




}














