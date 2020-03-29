class Utils{

    
    static addEventListenerAll(element,events,func){

        events.split(" ").forEach(event=>{//dentro do split tem que ser aspas duplas e separadas por um espaço em branco

            element.addEventListener(event,func);


        });
       
    }

}