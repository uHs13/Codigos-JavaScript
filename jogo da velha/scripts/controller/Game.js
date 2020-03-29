/*Por que chama Game uma classe de jogo da velha???
    Poque não sei como chama jogo da velha em inglês.

    Até a próxima.

*/
class Game {

    constructor() {
        this._plays = [];//Armazena o número de jogadas;
        this._player = false;//variável que vai controlar de quem é a vez de jogar;
        this._letter = "";//letra que o jogador vai aidionar no tabuleiro
        this._dateEl = document.querySelector("#date");//seleciona o elemento que mostra a data e  hora na tela;
        this._winEl = document.querySelector("#win");//
        this._locale="pt-BR";//string com o codigo do pais para formatação da data e da hora;
        this._hasWin = false;//variável que indica se tivemos um vencedor ou não na partida;
        this._title = document.querySelector(".title");
        this._p1Score = document.querySelector('#p1');
        this._p2Score = document.querySelector('#p2'); 
        this._resetButton = document.querySelector('#resetGame');
        this.init();//função que faz o jogo rodar;
        
    }

    set p1Score(value){

        this._p1Score.value = value;

    }

    set p2Score(value){

        this._p2Score.value = value;

    }

    init() {

        this.setDateDisplay();//Adiciona as informações de data e hora no elemento em baixo do tabuleiro;

        setInterval(()=>{//Esse método é chamado novamente a cada 1s para fazer a hora ser atualizada;
            this.setDateDisplay();
        },1000);

        this.writeTitle();
        this.initButtons();//inicia os eventos dos botões;
        this.setScores();//inicia o placar
        
    
    }

    setStoragePontuation(pontuation1,pontuation2){


        let score = {'pontuation1':pontuation1,'pontuation2':pontuation2};
        //console.log(score);
        this.resetStoragePontuation();
        localStorage.setItem('pontuation',JSON.stringify(score));



    }

    resetStoragePontuation(){

        localStorage.setItem('pontuation','');

    }

    getStoragePontuation(){

        let scores = localStorage.getItem('pontuation'); //só passa um segundo argumento na hora de colocar valores;

        if(scores==''|| scores == null ) {//se não tivermos um json chamado pontuation na memória
        
            this.setStoragePontuation(0,0);//cria um e seta como 0,0;
            
           this.setScores();

           return;
           

        } else {

            let jsonScores = JSON.parse(scores);
            //console.log(jsonScores);
            
            return jsonScores;
            


        }


    }

    setScores(){

        let score = this.getStoragePontuation();
        
        //console.log(score);

        this.p1Score = score.pontuation1;
        this.p2Score = score.pontuation2;

    }

    updateStoragePontuation(player){

        console.log('entrou:',player);

        let scores = this.getStoragePontuation();

        let p1 = scores.pontuation1;

        let p2 = scores.pontuation2;

        if(!player) {

            p1++;

        } else{

            p2++;

        }

        //p1 false  -  p2 true
        console.log('era pra ter atualizado');
        this.setStoragePontuation(p1,p2);



    }

    get player(){

        return this._player;

    }

    writeTitle(){

        this._title.innerHTML = 'Jogo da Velha';

    }


    playerSwap() {//Depois de cada jogada temos que trocar o jogador da vez;
        this._player = !this._player;
    }

    winSwap(){//Caso tenha um vencedor na partida a variável hasWin recebe true;( variáveis com _ antes do nome são privadas por convenção );
        this._hasWin = !this._hasWin;
    }

    get letter() {//Determina qual a letra vai ser colocada no tabuleiro de acordo com o jogador da vez;
        
        switch (this.playertoInt()) {
            case 1:
                this._letter = "X";
                break;

            case 2:
                this._letter = "O";
        }  

        return this._letter;
    }

    get currentDate(){//retorna uma nova instância de Date para podermos mostrar a data e a hora atuais;
        return new Date();
    }

    setDateDisplay(){//Formatação e inserção da data e hora na tela do jogo;

        this._dateEl.textContent = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month:"numeric",
            year:"numeric"
        })+"  - "+this.currentDate.toLocaleTimeString(this.locale);
    }

    setWinDisplay(value){//rotina que adiciona texto a caixa de texto de vitória e empate;
        this._winEl.innerHTML = value;
    }

    playertoInt() {//Como a vez de cada um é determinda por booleanos, convertemos para numeros para ficar mais fácil de trabalhar;

        return (this._player) ? 2 : 1;

    }
    
    drawFigure(button) {//de acordo com o jogador da vez adiciona a letra colorida no tabuleiro. O player 1 é azul e o 2 vermelho;
        
        switch(this.playertoInt()){
            case 1:
            button.style.color = "blue";
            break;

            case 2:
            button.style.color = "red";
            break;
        }
        button.innerHTML = this.letter;
    
    }
 
    getButtonValue(btn) {//pega o id dos botões retirando a parte desnecessária e deixando somente o número;
        return btn.id.replace("btn-","");
    }

    getEmptybtn(btn) {//função que verifica se o botão já tem uma letra marcada. Se tiver o outro jogador não pode marcar em cima;
        return btn.textContent == "";
    }

    getButtons(){//seleciona todos os botões do tabuleiro e os retorna em um array;
        return document.querySelectorAll("button");
    }

    getTextContent(btn){//retorna o texto que está no botão
        return btn.textContent;
    }

    equalContent(btn1,btn2,btn3){//verifica primeiro se os botões estão vazios. Caso não estejam comparam o texto dentro deles.
      
        if(!this.getEmptybtn(btn1) && !this.getEmptybtn(btn2) && !this.getEmptybtn(btn3)){
            if(this.getTextContent(btn1)==this.getTextContent(btn2)){//Como no jogo da velha pra ganhar temos que marcar 3 casas em sequência vertical,horizontal ou diagonal a função recebe 3  botões de uma vez;
                if(this.getTextContent(btn2)==this.getTextContent(btn3)){//caso os 3 estejam marcados e com a mesma letra um dos jogadores ganhou;
                    return true;
                }
            }
        }
   
    }

    winDisplayMsg(string,player = this._player ){//determina o que vai aparecer no display de vitória e empate;
       
        this._winEl.style.visibility="visible";//esse display não é visível durante todo o jogo, somente quando ocorre a vitória ou empate;
        

        switch(player){

            case false:
                this._winEl.style.color = 'blue';
                break;

            case true:
            this._winEl.style.color = 'red';
                break;
            
            case 'draw':
            this._winEl.style.color = 'green';
        }
        

        this.setWinDisplay(string);//adicionamos a mensagem passada ao display;
        setTimeout(()=>{//depois ed 2,5s a aplicação é reiniciada para os jogadores não terem de apertar f5 ou o reload do navegador;
            window.location.reload();
        },2500);
    
    }

    setWinner(){//usa a rotina winDisplayMsg para deteminar o que vai ser mostrado em caso de vitória;

        this.winDisplayMsg("Vitória do player "+ this.playertoInt());//mostra vitoria do player + o número referente ao player que ganhou;

        this.updateStoragePontuation(this.player);
        

    }

    getNoWin(){//caso nenhum dos dois ganhe após todos as posições do tabuleiro terem sido preenchidas essa função é acionada;

        if(this._plays.length == 9 && !this._hasWin){//como são 9 posições disponíveis no tabuleiro e a cada jogada colocamos o botão clicado no array _plays (é colocado o número do botão só pra ter relação com a jogada. Poderia ser adicionado qualquer coisa no array, unica coisa que nos interessa é aidionar uma posição após cada jogada);
            this.winDisplayMsg("Ninguem ganhou :(",'draw');//caso o array esteja com 9 posições, ou seja, as 9 posições do tabuleiro estão ocupadas e não haja vencedor (A variável _hasWin não tenha recebido true) ocorreu um empate; 
            //O empate é informado no display e o jogo é reiniciado;
        }
    
    }

    getWinner(){//São feitas as comparações para verificar se algum jogador ganhou;
        /*
            O tabuleiro do jogo da velha é 3X3. Para ganhar o jogador tem que marcar uma sequencia de 3 posições verticais, horizontais ou diagonais 
            temos 3 possibilidades de vitória na horizontal (linha 1, linha 2 e linha 3). marcar 3 da esquerda pra direita ou ao contrário dá na mesma;
            temos 3 possibilidades de vitória na vertical (coluna 1, coluna 2 e coluna 3). marcar 3 da cima pra baixo ou ao contrário dá na mesma;
            temos 2 possibilidades de vitória na diagonal (diagonal principal e secundária [o tabuleiro é uma matriz]). as diagonais seguem a mesma lógica da linha e coluna, macar em uma direção ou ao contrário dá na mesma.

            os botões estão assim no tabuleiro:
            1  2  3
            4  5  6
            7  8  9

            Quando chamamos a função getButtons para capturar todos os botões do tabueleiro eles vêm na sequência normal (1,2,3,...9) pois estão dispostos também em sequência no arquivo .html;
            Porém temos que adicioná-los em um array e os array começam em 0 as posições de cada botão acabam ficando um número abaixo:
            
            botões no array:
            0  1  2
            3  4  5
            6  7  8

            O indice do array armazena o botão de número index+1 -> array[0] => botão 1, array[1] => botão 2, ...;

            Sabendo disso as possibilidades de vitória são:

            Horizontal: 012, 345 e 678;
            Vertical  : 036, 147 e 258;
            Diagonais : 048 e 246;
        
        */
       
        let buttons = this.getButtons();//array buttons armazena os botões do layout (desenho do tabuleiro da tela);

        //Verifica vitória na horizontal
        if(this.equalContent(buttons[0],buttons[1],buttons[2])){
            this.setWinner();
            this.winSwap();
        }else if(this.equalContent(buttons[3],buttons[4],buttons[5])){//if else if entra em somente uma das condições;
            this.setWinner();
            this.winSwap();
        }else if(this.equalContent(buttons[6],buttons[7],buttons[8])){
            this.setWinner();
            this.winSwap();
        }
        
        //Verifica vitória na vertical
        else if(this.equalContent(buttons[0],buttons[3],buttons[6])){
            this.setWinner();
            this.winSwap();
        }else if(this.equalContent(buttons[1],buttons[4],buttons[7])){
            this.setWinner();
            this.winSwap();
        }else if(this.equalContent(buttons[2],buttons[5],buttons[8])){
            this.setWinner();
            this.winSwap();
        }

        //Verifica vitoria na diagonal
        else if(this.equalContent(buttons[0],buttons[4],buttons[8])){
            this.setWinner();
            this.winSwap();
        }else if(this.equalContent(buttons[2],buttons[4],buttons[6])){
            this.setWinner();
            this.winSwap();
        }

    }

    getPlayslength(){//retorna o tamanho do array com o número de jogadas
    
        return this._plays.length;
   
    }

    checkWin(){//Só temos a possibilidade de ter um vencedor após 5 jogadas ocorridas, 3 do player 1 e 2 do player 2;
       
        if(this.getPlayslength() >= 5){//caso o array já tenha 5 posições (5 jogadas ocorridas);
          
            this.getWinner();
        
        }//se não tiverem ocorrido 5 jogadas ainda não tem nada pra fazer e sai do if

        return;//return sai da função;
    }

    checkDraw(){
        
        if(this.getPlayslength() == 9){
            
            this.getNoWin();
        
        }//se o array não tiver 9 posições ainda não tem nada pra fazer e sai do if;
        
        return;//return sai da função;

    }

    initButtons() {//Inicialziamos os eventos em cada um dos botões;

        //Como a função getButtons retorna um array com todos os botões, para acessá-los separadamente para aplicar os eventos temos que fazer um forEach;
        this.getButtons().forEach((btn) => {//btn é a representação de um elemento do array com os botões;

            //A função addEventListener adiciona um evento só por vez, por conta disso fizemos uma função para adicionar mais por vez
            this.addEventListenerAll(btn, "click drag", e => {//Eventos de clicar e clicar e arrastar;
                // console.log(btn.id.replace("btn-"," "));
                //Se o botão estiver vazio e o jogo não tiver acabado
                if (this.getEmptybtn(btn) && !this._hasWin) {//para cada clique verificamos se o botão está está vazio (sem nenhuma letra adicionada);
                    this.drawFigure(btn);//Caso esteja podemos adicionar uma letra ("X - player 1" ou "O - player 2");
                    this._plays.push(this.getButtonValue(btn));//Adicionamos o número do botão ao array plays só pra ter o controle sobre o número de jogadas já feitas;
                    this.checkWin();//caso o array já tenha 5 posições devemos começar a checar se alguem ganhou após cada jogada; Antes disso não tem necessidade de gastar processamento verificando, já que não tem nem jogadas suficientes pra ter um vencedor;
                    this.checkDraw();//Depois que todos os botões tenham sido marcados (9 jogadas e 9 posições no array _plays) e ninguém tenha ganhado temos que mostrar a mensagem de empate;
                    this.playerSwap();//depois de cada jogada a vez troca;
                }
            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", func => {//trocamos o símbolo do cursor quando passamos com o mouse em cima dos botões
                btn.style.cursor = "pointer";//Fazendo isso fica mais intuitivo que devemos clicar nos botões;
            })
        
        });

        this.addEventListenerAll(this._resetButton,'click drag',func=>{

            this.setStoragePontuation(0,0);
            window.location.reload();

        });
        

    }

    addEventListenerAll(element, events, func) {// A função addEventListener do JavaScript permite adicionarmos apenas um avento por vez em um elemento. Essa função ( AddEventListenerAll ) retira essa nos permite adicionar mais de um sem termos muito trabalho;
       
        events.split(" ").forEach(event => {//recebemos o elemento que queremos adicionar eventos, uma string com o nome dos eventos separados por um espaço em branco e uma função. Fazemos um split nessa string separando-a pelo espaço em branco;
           
            element.addEventListener(event, func);//cada evento na string é adcionado ao elemento passado;
       
        });
    
    }

}