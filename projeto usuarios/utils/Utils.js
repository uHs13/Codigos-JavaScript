class Utils{


    //Método estático -> Método que podemos chamar sem precisarmos criar um objeto;
    static dateShaped(){//Retorna a data e a hora do servidor formatadas;

        let date = new Date();
        let locale = 'pt-BR';
        return date.toLocaleDateString(locale,{
            day:'2-digit',//numeric
            month:'2-digit',//2-digit,narrow,short,long
            year:'2-digit'//numeric
        })+"  "+date.toLocaleTimeString(locale);
    
    }

    static dateFormat(date){//Retorna uma data direta do new Date() formatada;

        return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
    
    }


    static addEventListenerAll(element,events,func){

        events.split(" ").forEach(event=>{

            element.addEventListener(event,func);

        });

        


    }

}