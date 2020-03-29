/**
 * Fibonacci tem como valores iniciais 0 e 1. Cada termo após esses dois é obtido 
 * através da soma dos dois valores antecessores 
 *  0,1,1,2,3,5,8,13,21,34,55,89,144,233,377,...
 * 
 */

class Fibonacci{

    constructor(num,max){

        this.buildFibonacci(num,max);


    }

    buildFibonacci(num,max){//mostra os próximos max numeros da sequencia de fibonacci, começando por num

        console.log (`Entrada -> ${num}:`);

        //variável: espaço na memória onde armazenamos informações úteis ao nosso código
        let array = new Array(); //let array = [];
        //array.push(num);

        for(let i = num;i < num + max ; i++){

            array.push(this.fibonacci(i));
            

        }

        console.log('Fibonacci: '+ array);

    }

    fibonacci(num){

        return (num < 2)? num : this.fibonacci( num - 1 ) + this.fibonacci( num - 2 ); 
        
    
    }

}