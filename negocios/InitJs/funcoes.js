function calcular(val1, val2, op){//Funções fora de classe precisam do function antes da implementação;
    return  eval(`${val1} ${op} ${val2}`);
}


console.log(calcular(4,4,'*'));